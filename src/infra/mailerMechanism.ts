import nodemailer from 'nodemailer'

type MailerConfig = {
  accessToken: string
  clientId: string
  clientSecret: string
  host: string
  port: number
  refreshToken: string
  secure: boolean
  sender: string
}

export const setupMailerMechanism = ({
  accessToken,
  clientId,
  clientSecret,
  host,
  port,
  refreshToken,
  secure,
  sender,
}: MailerConfig) => {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      accessToken,
      clientId,
      clientSecret,
      refreshToken,
      type: 'OAUTH2',
      user: sender,
    },
    sender,
  })

  return transporter
}

export type MailerMechanism = ReturnType<typeof setupMailerMechanism>
