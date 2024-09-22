// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use std::time::Duration;
use std::thread;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn download_audio(url: String, output_path: String) -> Result<String, String> {
    println!("Starting download for URL: {}", url); 
    println!("Starting download for Output_path: {}", output_path); 

    let command_string = format!(
        "const ytdl = require('ytdl-core'); \
         const fs = require('fs'); \
         const stream = ytdl('{}', {{ \
            quality: 'highestaudio', \
            requestOptions: {{ \
              headers: {{ \
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' \
              }} \
            }} \
         }}); \
         const output = fs.createWriteStream('{}'); \
         stream.pipe(output); \
         stream.on('error', (err) => {{ console.error('Stream error:', err); }}); \
         output.on('finish', () => {{ \
            console.log('Download complete'); \
         }}); \
         output.on('error', (err) => {{ console.error('Write error:', err); }});",
        url, output_path
    );

    println!("Generated command: {}", command_string);

    let output = Command::new("node")
        .arg("--max-old-space-size=4096")
        .arg("-e")
        .arg(command_string)
        .output()
        .map_err(|err| format!("Failed to execute process: {}", err))?;

    thread::sleep(Duration::from_secs(10));

    println!("stdout: {}", String::from_utf8_lossy(&output.stdout));
    eprintln!("stderr: {}", String::from_utf8_lossy(&output.stderr));

    if output.status.success() {
        Ok(format!("Audio saved to: {}", output_path))
    } else {
        Err(format!("Command failed with output: {:?}", output))
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, download_audio])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
