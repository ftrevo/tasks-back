import type { AuthMechanism } from '../../../infra'

export const verifyToken = (authMechanism: AuthMechanism) => (token: string) => {
  return authMechanism.verify(token)
}
