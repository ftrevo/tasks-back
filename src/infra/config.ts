import dotenv from 'dotenv'
import { z } from 'zod'

const configSchema = z.object({
  APP_SECRET_KEY: z.string(),
  DB_HOSTNAME: z.string(),
  DB_NAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_USERNAME: z.string(),
  DB_CONN_STRING: z.string(),
  ENCRYPT_SALT_ROUNDS: z.coerce.number().int().gt(0),
  MAILER_HOST: z.string(),
  MAILER_PORT: z.coerce.number().int().gt(0),
  MAILER_SECURE: z.coerce.boolean(),
  MAILER_SENDER: z.string(),
  NODE_ENV: z.union([z.literal('development'), z.literal('test'), z.literal('production')]),
  PORT: z.coerce.number().int().gt(0),
  TOKEN_EXPIRATION_TIME_IN_MS: z.coerce.number().int().gt(0),
  OAUTH_CLIENT_ID: z.string(),
  OAUTH_CLIENT_SECRET: z.string(),
  OAUTH_REFRESH_TOKEN: z.string(),
  OAUTH_ACCESS_TOKEN: z.string(),
})

const getOnProd = () => ({
  APP_SECRET_KEY: process.env.APP_SECRET_KEY,
  DB_HOSTNAME: process.env.DB_HOSTNAME,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_CONN_STRING: process.env.DB_CONN_STRING,
  ENCRYPT_SALT_ROUNDS: process.env.ENCRYPT_SALT_ROUNDS,
  MAILER_HOST: process.env.MAILER_HOST,
  MAILER_PORT: process.env.MAILER_PORT,
  MAILER_SECURE: process.env.MAILER_SECURE,
  MAILER_SENDER: process.env.MAILER_SENDER,
  NODE_ENV: 'production',
  PORT: process.env.PORT,
  TOKEN_EXPIRATION_TIME_IN_MS: process.env.TOKEN_EXPIRATION_TIME_IN_MS,
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
  OAUTH_ACCESS_TOKEN: process.env.OAUTH_ACCESS_TOKEN,
})

export const loadConfigs = () => {
  let parsed
  if (process.env.NODE_ENV === 'production') {
    parsed = getOnProd()
  } else {
    const dotenvConfig = dotenv.config()
    parsed = dotenvConfig.parsed
  }

  const config = configSchema.parse(parsed)

  return config
}

export type Config = ReturnType<typeof loadConfigs>
