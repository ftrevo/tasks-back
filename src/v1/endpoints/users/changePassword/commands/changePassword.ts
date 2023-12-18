import { NotFoundError } from '../../../../../infra'
import type { SharedCommands } from '../../../../shared'
import type { ChangePasswordRequestParams } from '../validation'

type ChangePasswordDependencies = {
  commands: Pick<SharedCommands, 'findUser' | 'createToken'>
}

export const changeUserPassword =
  ({ commands: { findUser, createToken } }: ChangePasswordDependencies) =>
  async ({ password, ...findParams }: ChangePasswordRequestParams) => {
    const user = await findUser(findParams)

    if (!user) {
      throw new NotFoundError('Invalid email or reset code')
    }

    await user.update({ password })

    const token = createToken(user)

    return {
      id: user.id!,
      token,
      name: user.name,
    }
  }
