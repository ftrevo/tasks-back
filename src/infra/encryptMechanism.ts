import * as bcrypt from 'bcrypt'

export const setupEncryptMechanism = (saltRounds: number) => {
  const hashPassword = (rawPassword: string) => {
    const salt = bcrypt.genSaltSync(saltRounds)

    const hashedPassword = bcrypt.hashSync(rawPassword, salt)

    return hashedPassword
  }

  const comparePassword = (candidade: string, password: string) => {
    return bcrypt.compareSync(candidade, password)
  }

  return {
    hashPassword,
    comparePassword,
  }
}

export type EncryptMechanism = ReturnType<typeof setupEncryptMechanism>
