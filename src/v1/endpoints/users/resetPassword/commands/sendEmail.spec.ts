import { MailerMechanism } from '../../../../../infra'
import { sendEmail } from './sendEmail'
import { faker } from '@faker-js/faker'

describe('sendEmail command', () => {
  const mockData = {
    email: faker.internet.email(),
    resetCode: faker.string.hexadecimal({ length: 6 }),
  }

  it('should send email', async () => {
    const mockMailer = {
      sendMail: jest.fn().mockResolvedValue(true),
    }

    const sendEmailCommand = sendEmail(mockMailer as any as MailerMechanism)

    await sendEmailCommand(mockData)

    expect(mockMailer.sendMail).toHaveBeenCalledWith({
      to: mockData.email,
      subject: 'Password reset code',
      html: `<b>${mockData.resetCode}</b>`,
    })
  })

  it('should throw an error if mailer.sendMail throws', async () => {
    const mockMailer = {
      sendMail: jest.fn().mockRejectedValueOnce(new Error('mailer.sendEmail error')),
    }

    const sendEmailCommand = sendEmail(mockMailer as any as MailerMechanism)

    await expect(sendEmailCommand(mockData)).rejects.toThrow('mailer.sendEmail error')
    expect(mockMailer.sendMail).toHaveBeenCalledWith({
      to: mockData.email,
      subject: 'Password reset code',
      html: `<b>${mockData.resetCode}</b>`,
    })
  })
})
