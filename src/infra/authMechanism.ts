import * as jwt from 'jsonwebtoken'

export type SignParams = {
  id: number
  name: string
  email: string
}

type VerifyOutput = {
  id: number
  name: string
  email: string
  iat: number
  exp: number
}

export const setupAuthMechanism = (secret: string, tokenExpirationTimeInMs: number) => {
  const sign = (params: SignParams) => {
    return jwt.sign(params, secret, { expiresIn: tokenExpirationTimeInMs })
  }

  // FIXME add missing prefix
  const verify = (token: string) => {
    return jwt.verify(token, secret) as VerifyOutput
  }

  return {
    sign,
    verify,
  }
}

export type AuthMechanism = ReturnType<typeof setupAuthMechanism>
