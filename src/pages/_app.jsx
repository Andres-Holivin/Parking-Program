import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import theme from '../styles/theme'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}
