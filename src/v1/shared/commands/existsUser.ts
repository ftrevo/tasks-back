import type { AppDependencies } from '../../../app'

type ExistsUserParams = {
  email: string
}

export const existsUser =
  (UsersModel: AppDependencies['models']['Users']) =>
  async ({ email }: ExistsUserParams) => {
    const count = await UsersModel.count({ where: { email } })

    return count > 0
  }
