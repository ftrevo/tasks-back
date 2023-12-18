import { createServer } from 'http'

import { createApp } from './app'
import { createSocketServer } from './socket'
import { loadConfigs, setupInfra } from './infra'

const start = async () => {
  const config = loadConfigs()

  const { models, sequelize, dbDisconnect, mechanisms } = await setupInfra(config)

  const app = await createApp({ models, mechanisms, sequelize })

  const server = createServer(app)

  const { socketDisconnect } = createSocketServer({ auth: mechanisms.auth, models, sequelize, server })

  server.listen(config.PORT, () => {
    console.log(`Application is running at ${config.PORT}`)
  })

  return { server, dbDisconnect, socketDisconnect }
}

const main = async () => {
  const { server, dbDisconnect, socketDisconnect } = await start()

  const shutDownSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT', 'uncaughtException']

  shutDownSignals.forEach((signal) =>
    process.on(signal, async () => {
      await dbDisconnect()
      socketDisconnect(() => {
        server.close(() => {
          console.log('HTTP server closed')
        })
      })
    })
  )

  process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection', error)
  })
}

main().catch((error) => {
  console.error('Error during service initialization', error)
  process.exit(1)
})
