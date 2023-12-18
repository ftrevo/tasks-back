import { Router } from 'express'
import { ping } from './endpoints'
import type { AppDependencies } from '../app'
import { setupSharedCommands } from './shared'
import { setupUsersActions, setupAuthActions } from './endpoints'

export const v1Routes = ({ models, mechanisms: { mailer, auth, encrypt }, sequelize }: AppDependencies) => {
  const router = Router()

  const commands = setupSharedCommands({ models, auth, sequelize })

  // Unificar isso aqui
  const userActions = setupUsersActions({
    mailer,
    models,
    commands,
  })
  const authActions = setupAuthActions({
    commands,
    encrypt,
  })

  router.get('/', ping)

  router.post('/user', userActions.create)
  router.patch('/user/reset-password', userActions.resetPassword)
  router.patch('/user/change-password', userActions.changePassword)
  router.post('/auth/login', authActions.login)

  return router
}
