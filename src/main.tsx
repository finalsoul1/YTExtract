import { Box, ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { YTE } from './pages/YTE'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Box minHeight="100vh" minWidth="100wh" bg="gray.100">
        <YTE />
      </Box>
    </ChakraProvider>
  </React.StrictMode>,
)
