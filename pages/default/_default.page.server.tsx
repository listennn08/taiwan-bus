import ReactDOMServer from 'react-dom/server'
import { PageShell } from './PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import logoUrl from '@/public/logo.ico'
import type { PageContext } from './types'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import { Provider } from 'react-redux'
import store from '@/store'

export { render }
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname']

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const { Page, pageProps } = pageContext

  const pageHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    </Provider>
  )

  // See https://vite-plugin-ssr.com/html-head
  const { documentProps } = pageContext
  const title = (documentProps && documentProps.title) || '等等公車'
  const desc = (documentProps && documentProps.description) || '全台公車整合資訊網'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="zh-tw">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  }
}
