import { Sequelize } from 'sequelize'
import { disconnect } from './disconnect'
import type { EncryptMechanism } from '../encryptMechanism'
import { createModels } from './models/createModels'

export const connect = async (config: string, encryptMethod: EncryptMechanism) => {
  const sequelize = new Sequelize(config)

  await sequelize.authenticate()

  const models = createModels(sequelize, encryptMethod)

  return { sequelize, models, disconnect: disconnect(sequelize) }
}

type ConnectedDb = Awaited<ReturnType<typeof connect>>

export type Models = ConnectedDb['models']
export type DisconnectFn = ConnectedDb['disconnect']
