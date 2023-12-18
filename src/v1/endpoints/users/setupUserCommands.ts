import type { MailerMechanism, Models } from '../../../infra'
import type { SharedCommands } from '../../shared'
import { changeUserPassword } from './changePassword/commands/changePassword'
import { createRandomCode } from './resetPassword/commands/createRandomCode'
import { createUser } from './create/commands/createUser'
import { resetUserPassword } from './resetPassword/commands/resetPassword'
import { saveUser } from './create/commands/saveUser'
import { sendEmail } from './resetPassword/commands/sendEmail'

export type UsersDependencies = {
  models: Models
  commands: SharedCommands
  mailer: MailerMechanism
}

export const setupUsersCommands = ({
  models,
  commands: { createToken, findUser, existsUser },
  mailer,
}: UsersDependencies) => {
  const createCommand = createUser({
    commands: {
      saveUser: saveUser(models),
      createToken,
      existsUser,
    },
  })

  const resetPasswordCommand = resetUserPassword({
    commands: {
      findUser,
      sendEmail: sendEmail(mailer),
      createRandomCode,
    },
  })

  const changePasswordCommand = changeUserPassword({
    commands: {
      findUser,
      createToken,
    },
  })

  return { createCommand, resetPasswordCommand, changePasswordCommand }
}

export type UserCommands = ReturnType<typeof setupUsersCommands>
