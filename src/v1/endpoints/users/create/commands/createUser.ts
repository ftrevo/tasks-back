import { BusinessError } from '../../../../../infra'
import type { SharedCommands } from '../../../../shared'
import type { CreateUserRequestParams } from '../validation'
import type { SaveUser } from './saveUser'

type CreateUsersDependencies = {
  commands: {
    saveUser: SaveUser
  } & Pick<SharedCommands, 'createToken' | 'existsUser'>
}

export const createUser =
  ({ commands: { saveUser, createToken, existsUser } }: CreateUsersDependencies) =>
  async ({ email, ...additionalFields }: CreateUserRequestParams) => {
    const exists = await existsUser({ email })

    if (exists) {
      throw new BusinessError('Email already used')
    }

    const user = await saveUser({ email, ...additionalFields })

    const token = createToken(user)

    return {
      id: user.id!,
      token,
      name: user.name,
    }
  }
