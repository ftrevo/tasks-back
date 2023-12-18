import { Models } from '../../../../../infra'
import type { CreateUserRequestParams } from '../validation'

type SaveUserDependencies = {
  Users: Models['Users']
}

export const saveUser =
  ({ Users }: SaveUserDependencies) =>
  async (params: CreateUserRequestParams) => {
    const user = Users.build(params)

    const savedUser = await user.save()

    return savedUser
  }

export type SaveUser = ReturnType<typeof saveUser>
