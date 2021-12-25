import { ChakraProvider } from '@chakra-ui/react'

import { GlobalContextProvider } from '../contexts'

import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
