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
import { useForm } from 'react-hook-form'
import { YTEFormValues } from './model'

const URL_INPUT_ID = 'url-input-id'

export const YTE = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<YTEFormValues>()

  console.log({ errors })

  return (
    <Flex justify="center" paddingTop={24}>
      <Stack width={600}>
        <form
          onSubmit={handleSubmit((data) => {
            console.log({ data })
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
