import type { Config } from './config'

import { connect } from './db'
import { setupAuthMechanism } from './authMechanism'
import { setupMailerMechanism } from './mailerMechanism'
import { setupEncryptMechanism } from './encryptMechanism'

export const setupInfra = async (config: Config) => {
  const mechanisms = {
    auth: setupAuthMechanism(config.APP_SECRET_KEY, config.TOKEN_EXPIRATION_TIME_IN_MS),
    encrypt: setupEncryptMechanism(config.ENCRYPT_SALT_ROUNDS),
    mailer: setupMailerMechanism({
      host: config.MAILER_HOST,
      port: config.MAILER_PORT,
      secure: config.MAILER_SECURE,
      sender: config.MAILER_SENDER,
      accessToken: config.OAUTH_ACCESS_TOKEN,
      clientId: config.OAUTH_CLIENT_ID,
      clientSecret: config.OAUTH_CLIENT_SECRET,
      refreshToken: config.OAUTH_REFRESH_TOKEN,
    }),
  }

  const { sequelize, models, disconnect } = await connect(config.DB_CONN_STRING,
    mechanisms.encrypt
  )

  return { sequelize, models, dbDisconnect: disconnect, mechanisms }
}
