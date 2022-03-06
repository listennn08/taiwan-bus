import 'windi.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withRedux } from '../store'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withRedux(App)
