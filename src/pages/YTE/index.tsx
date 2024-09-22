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
import { DownloadStatus, YTEFormValues } from './model'

const URL_INPUT_ID = 'url-input-id'

export const YTE = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<YTEFormValues>()

  const [status, setStatus] = useState<DownloadStatus>('initial')

  const downloadAudio = async ({ url }: { url: string }) => {
    try {
      const outputPath = await save({
        defaultPath: 'audio.mp3', // 기본 파일명 설정 (선택 사항)
        filters: [
          { name: 'Audio', extensions: ['mp3'] }, // 파일 유형 필터
        ],
      })

      console.log('outputPath: ', outputPath)

      // Tauri Command 호출
      const result = await invoke('download_audio', {
        url,
        outputPath,
      })

      console.log('completed invoke')

      console.log('result: ', result)

      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('fail')
    }
  }

  console.log('status: ', status)

  return (
    <Flex justify="center" paddingTop={24}>
      <Stack width={600}>
        <form
          onSubmit={handleSubmit((data) => {
            console.log({ data })

            downloadAudio({ url: data.url })
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
