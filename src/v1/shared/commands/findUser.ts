import type { AppDependencies } from '../../../app'

type FindUserParams =
  | {
      email: string
    }
  | {
      email: string
      resetCode: string
    }

export const findUser = (UsersModel: AppDependencies['models']['Users']) => async (params: FindUserParams) => {
  const user = await UsersModel.findOne({ where: params })

  return user
}
