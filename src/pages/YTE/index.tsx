import { Flex, Heading, Input, Stack } from '@chakra-ui/react'

interface Props {}

export const YTE = (_: Props) => {
  return (
    <Flex justify="center" paddingTop={24}>
      <Stack width={600} spacing={6}>
        <Heading>YTE</Heading>
        <Input placeholder="URL을 입력해주세요." size="lg" bg="white" />
      </Stack>
    </Flex>
  )
}
