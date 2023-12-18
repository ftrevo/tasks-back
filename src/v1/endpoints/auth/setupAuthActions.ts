import { login } from './login'
import { setupAuthCommands, type AuthDependencies } from './setupAuthCommands'

export const setupAuthActions = (dependencies: AuthDependencies) => {
  const { loginCommand } = setupAuthCommands(dependencies)

  return {
    login: login(loginCommand),
  }
}
