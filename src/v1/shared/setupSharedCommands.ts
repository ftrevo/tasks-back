import { Sequelize } from 'sequelize'
import type { AuthMechanism, Models } from '../../infra'
import * as sharedCommands from './commands'

export type SharedCommandsDependencies = {
  auth: AuthMechanism
  models: Models
  sequelize: Sequelize
}

export const setupSharedCommands = (dependencies: SharedCommandsDependencies) => {
  const findAllTasks = sharedCommands.findAllTasks(dependencies)

  const createToken = sharedCommands.createToken(dependencies.auth)
  const existsUser = sharedCommands.existsUser(dependencies.models.Users)
  const findUser = sharedCommands.findUser(dependencies.models.Users)
  const verifyToken = sharedCommands.verifyToken(dependencies.auth)

  return {
    createToken,
    findUser,
    verifyToken,
    existsUser,
    findAllTasks,
  }
}

export type SharedCommands = ReturnType<typeof setupSharedCommands>
