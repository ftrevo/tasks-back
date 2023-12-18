import crypto from 'crypto'

// Adiciono como variável de ambiente?
const defaultResetCodeLenght = 6

export const createRandomCode = () => {
  return crypto.randomBytes(defaultResetCodeLenght).toString('hex').substring(0, defaultResetCodeLenght)
}

export type CreateRandomCode = typeof createRandomCode
