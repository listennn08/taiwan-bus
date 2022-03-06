import 'windi.css'
import '@/styles/globals.css'
import '@/styles/leaflet.css'

import { wrapper } from '@/store'
import Layout from '@/components/Layout'


import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(App)
