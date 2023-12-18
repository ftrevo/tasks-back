import type { ResetPasswordRequestParams } from '../validation'
import type { SendEmail } from './sendEmail'
import type { SharedCommands } from '../../../../shared'
import type { CreateRandomCode } from './createRandomCode'
import { NotFoundError } from '../../../../../infra'

type ResetPasswordDependencies = {
  commands: {
    sendEmail: SendEmail
    findUser: SharedCommands['findUser']
    createRandomCode: CreateRandomCode
  }
}

export const resetUserPassword =
  ({ commands: { findUser, sendEmail, createRandomCode } }: ResetPasswordDependencies) =>
  async (params: ResetPasswordRequestParams) => {
    const user = await findUser(params)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const resetCode = createRandomCode()

    await user.update({ resetCode })

    await sendEmail({ resetCode, ...params })
  }
