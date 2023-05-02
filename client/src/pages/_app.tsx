import '@source/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, } from "@chakra-ui/react"
import { Provider } from "react-redux"
import { store } from '@source/redux/store'
import { theme } from '@source/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}
