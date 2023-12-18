import { changePassword } from './changePassword'
import { createUser } from './create'
import { resetPassword } from './resetPassword'
import { setupUsersCommands, type UsersDependencies } from './setupUserCommands'

export const setupUsersActions = (dependencies: UsersDependencies) => {
  const { createCommand, resetPasswordCommand, changePasswordCommand } = setupUsersCommands(dependencies)

  return {
    create: createUser(createCommand),
    resetPassword: resetPassword(resetPasswordCommand),
    changePassword: changePassword(changePasswordCommand),
  }
}
