import type { MailerMechanism } from '../../../../../infra'

type SendEmailParams = {
  email: string
  resetCode: string
}

export const sendEmail =
  (mailer: MailerMechanism) =>
  async ({ email, resetCode }: SendEmailParams) => {
    const mailOptions = {
      to: email,
      subject: 'Password reset code',
      html: `<b>${resetCode}</b>`,
    }

    await mailer.sendMail(mailOptions)
  }

export type SendEmail = ReturnType<typeof sendEmail>
