import { faker } from '@faker-js/faker'
import { createToken } from './createToken'
import type { AuthMechanism } from '../../../infra'

describe('createToken command', () => {
  const mockUser = {
    id: faker.number.int({ min: 1 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }

  it('should create a token for a valid user', () => {
    const authMechanismMock = {
      sign: jest.fn().mockReturnValueOnce('validToken'),
    }

    const createTokenCommand = createToken(authMechanismMock as any as AuthMechanism)
    const result = createTokenCommand(mockUser)

    expect(result).toEqual('validToken')
    expect(authMechanismMock.sign).toHaveBeenCalledWith(mockUser)
  })

  it('should throw an error if user has no id', () => {
    const invalidUser = {
      ...mockUser,
      id: undefined,
    }

    const createTokenCommand = createToken({} as any as AuthMechanism)

    expect(() => createTokenCommand(invalidUser as any)).toThrow('Trying to create a token for a not saved user')
  })

  it('should throw an error if sign throws', () => {
    const authMechanismMock = {
      sign: jest.fn().mockImplementationOnce(() => {
        throw new Error('sign error')
      }),
    }

    const createTokenCommand = createToken(authMechanismMock as any as AuthMechanism)

    expect(() => createTokenCommand(mockUser)).toThrow('sign error')
  })
})
