const express = require('express')
const http = require('http')
const path = require('path')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { createPageRenderer } = require('vite-plugin-ssr')

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.local`)
})

const { typeDefs } = require('../dist/apollo/typeDefs')
const { resolvers } =  require('../dist/apollo/resolvers')

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

startServer()

async function startServer() {
  const app = express()

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  server.applyMiddleware({ app, path: '/graphql' })

  let viteDevServer
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  } else {
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true },
    })
    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root })
  app.get('/*', async (req, res, next) => {
    const url = req.originalUrl
    const pageContextInit = {
      url,
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const port = process.env.PORT || 3000
  httpServer.listen(port)
  console.log(`Server running at http://localhost:${port}`)
  console.log(`🚀 Apollo Server running at http://localhost:${port}/graphql`)
}
