import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import { createStoreRestMiddleware } from './middlewares'

import {
  defineInfraRoutes,
  errorHandlerRest,
  type AuthMechanism,
  type MailerMechanism,
  type EncryptMechanism,
  type Models,
} from './infra'

import { v1Routes } from './v1'
import { Sequelize } from 'sequelize'

export type AppDependencies = {
  models: Models
  mechanisms: {
    auth: AuthMechanism
    mailer: MailerMechanism
    encrypt: EncryptMechanism
  }
  sequelize: Sequelize
}

export const createApp = async (dependencies: AppDependencies) => {
  const app = express()

  app.use(express.json())
  app.use(
    cors({
      credentials: true,
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'HEAD', 'OPTIONS']
    })
  )
  app.use(helmet())

  app.use(createStoreRestMiddleware)

  app.use(defineInfraRoutes())
  app.use(v1Routes(dependencies))

  app.use(errorHandlerRest)

  return app
}
