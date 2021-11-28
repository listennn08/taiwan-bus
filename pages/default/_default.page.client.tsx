import 'virtual:windi.css'
import 'leaflet/dist/leaflet.css'
import './style.css'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { useClientRouter } from 'vite-plugin-ssr/client/router'
import { PageShell } from './PageShell'
import store from '@/store'

import type { PageContext } from './types'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'


const { hydrationPromise } = useClientRouter({
  async render(pageContext: PageContextBuiltInClient & PageContext) {
    const { Page, pageProps } = pageContext

    const page = (
      <Provider store={store}>
        <PageShell pageContext={pageContext}>
          <Page {...pageProps} />
        </PageShell>
      </Provider>
    )

    const container = document.getElementById('page-view')

    if (pageContext.isHydration) {
      ReactDOM.hydrate(page, container)
    } else {
      ReactDOM.render(page, container)
    }
  },
})

hydrationPromise.then(() => {
  // console.log('Hydration finished; page is now interactive.')
})
