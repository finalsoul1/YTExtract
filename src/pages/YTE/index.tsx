import { CheckIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { isEmpty } from '@fxts/core'
import { invoke } from '@tauri-apps/api'
import { save } from '@tauri-apps/api/dialog'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { YTEFormValues } from './model'

const URL_INPUT_ID = 'url-input-id'

export const YTE = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<YTEFormValues>()

  const [status, setStatus] = useState('')

  const downloadAudio = async (url: string) => {
    try {
      // 파일 저장 경로 선택 대화 상자
      const outputPath = await save({
        defaultPath: 'audio.mp3', // 기본 파일 이름
        filters: [
          { name: 'Audio', extensions: ['mp3'] }, // 파일 필터
        ],
      })

      if (!outputPath) {
        setStatus('Download canceled by user')
        return
      }

      // Tauri 명령어로 YouTube 음원 다운로드
      const result = await invoke('download_audio', {
        url,
        outputPath,
      })
      setStatus(result as string)
    } catch (error) {
      console.error('Download failed:', error)
      setStatus('Download failed.')
    }
  }

  console.log({ status })
  return (
    <Flex justify="center" paddingTop={24}>
      <Stack width={600}>
        <form
          onSubmit={handleSubmit((data) => {
            console.log({ data })

            downloadAudio(data.url)
          })}
        >
          <Stack spacing={6}>
            <Heading>YTE</Heading>

            <FormControl isInvalid={!isEmpty(errors)}>
              <InputGroup size="lg">
                <Input
                  id={URL_INPUT_ID}
                  placeholder="URL을 입력해주세요."
                  bg="white"
                  {...register('url', {
                    required: 'url을 입력해주세요!',
                  })}
                />
                <InputRightElement>
                  <CheckIcon color="green.500" />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button type="submit" colorScheme="teal">
              추출
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  )
}
