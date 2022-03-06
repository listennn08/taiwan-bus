import boxen from 'boxen'
import chalk from 'chalk'
import next from 'next'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './apollo/type-defs'
import { resolvers } from './apollo/resolvers'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const PORT = parseInt(process.env.PORT || '3000')
const hanlder = app.getRequestHandler()

async function startServer() {
  await app.prepare()

  const apolloServer = new ApolloServer({
    typeDefs, resolvers
  })

  const server = express()
  await apolloServer.start()

  apolloServer.applyMiddleware({ app: server })
  server.all('*', (req, res) => hanlder(req, res))

  server.listen(PORT, () => {
    console.log(boxen(
      '\n> Ready on ' + chalk.cyan.underline(`http://localhost:${PORT}`)+
      '\n> Apollo ready on ' + chalk.cyan.underline(`http://localhost:${PORT}${apolloServer.graphqlPath}\n`),
      {
        padding: 1,
        
      }
    ))
  })
}

startServer()