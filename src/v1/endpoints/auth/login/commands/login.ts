import { NotFoundError, type EncryptMechanism } from '../../../../../infra'
import type { SharedCommands } from '../../../../shared'
import type { LoginRequestParams } from '../validation'

export type LoginDependencies = {
  commands: Pick<SharedCommands, 'findUser' | 'createToken'>
  encrypt: EncryptMechanism
}

export const login =
  ({ commands: { findUser, createToken }, encrypt: { comparePassword } }: LoginDependencies) =>
  async ({ email, password }: LoginRequestParams) => {
    const user = await findUser({ email })

    if (!user || !comparePassword(password, user.password)) {
      throw new NotFoundError('User not found or incorrect password')
    }

    const token = createToken(user)

    return {
      id: user.id!,
      token,
      name: user.name,
    }
  }
