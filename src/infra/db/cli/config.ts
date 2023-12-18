import { loadConfigs } from '../../config'

const { DB_HOSTNAME, DB_NAME, DB_PASSWORD, DB_USERNAME, NODE_ENV } = loadConfigs()

export = {
  [NODE_ENV]: {
    database: DB_NAME,
    dialect: 'postgres',
    host: DB_HOSTNAME,
    password: DB_PASSWORD,
    username: DB_USERNAME,
  },
}
