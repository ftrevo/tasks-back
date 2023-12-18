import { EncryptMechanism } from '../../../infra'
import type { SharedCommands } from '../../shared'
import { login } from './login/commands/login'

export type AuthDependencies = {
  commands: Pick<SharedCommands, 'findUser' | 'createToken'>
  encrypt: EncryptMechanism
}

export const setupAuthCommands = ({ commands: { findUser, createToken }, encrypt }: AuthDependencies) => {
  const loginCommand = login({
    commands: {
      findUser,
      createToken,
    },
    encrypt,
  })

  return { loginCommand }
}

export type AuthCommands = ReturnType<typeof setupAuthCommands>
