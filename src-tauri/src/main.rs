// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rustube::{Id, VideoFetcher};
use std::fs::File;
use std::io::Write;

#[tauri::command]
async fn download_audio(url: String, output_path: String) -> Result<String, String> {
    // 1. YouTube 비디오 ID 추출
    let video_id = Id::from_raw(&url)
        .map_err(|e| format!("Failed to parse video ID: {}", e))?;

    // 2. 비디오 정보를 가져오기
    let fetcher = VideoFetcher::from_id(video_id)
        .map_err(|e| format!("Failed to create VideoFetcher: {}", e))?;

    // 3. 비디오 스트림 가져오기 (비동기 처리)
    let descrambler = fetcher.fetch().await.unwrap().descramble().unwrap().best_audio();

    // 4. 오디오 스트림 선택
    let audio_stream = descrambler
        .iter()
        .find(|stream| stream.includes_audio_track && !stream.includes_video_track)
        .ok_or("No audio stream found")?;

    // 5. 오디오 스트림 다운로드 - 이 부분이 파일 경로를 반환하는 것으로 가정
    let audio_path = audio_stream
        .download()
        .await
        .map_err(|e| format!("Failed to download audio: {}", e))?;

    // 6. 다운로드한 파일을 읽어와서 다른 경로로 저장
    let mut input_file = File::open(&audio_path)
        .map_err(|e| format!("Failed to open downloaded file: {}", e))?;

    let mut file = File::create(&output_path)
        .map_err(|e| format!("Failed to create output file: {}", e))?;

    let mut buffer = Vec::new();
    input_file.read_to_end(&mut buffer)
        .map_err(|e| format!("Failed to read downloaded file: {}", e))?;

    file.write_all(&buffer)
        .map_err(|e| format!("Failed to write to file: {}", e))?;

    // 7. 파일 저장 완료 메시지 반환
    Ok(format!("Audio saved to: {}", output_path))
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![download_audio])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
