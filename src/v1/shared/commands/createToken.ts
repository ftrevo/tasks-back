import { type User, type AuthMechanism, BusinessError } from '../../../infra'

type CreateTokenParams = {
  id?: number
  name: string
  email: string
}

export const createToken = (authMechanism: AuthMechanism) => (user: CreateTokenParams) => {
  if (!user.id) {
    throw new BusinessError('Trying to create a token for a not saved user')
  }

  const signParams = {
    id: user.id,
    name: user.name,
    email: user.email,
  }

  return authMechanism.sign(signParams)
}
