import { faker } from '@faker-js/faker'
import { verifyToken } from './verifyToken'
import { AuthMechanism } from '../../../infra'

describe('verifyToken command', () => {
  const mockToken = faker.string.hexadecimal()

  it('should verify a valid token', () => {
    const mockDecodedToken = {
      id: faker.number.int({ min: 1 }),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }

    const authMechanismMock = {
      verify: jest.fn().mockReturnValueOnce(mockDecodedToken),
    }

    const verifyTokenCommand = verifyToken(authMechanismMock as any as AuthMechanism)
    const result = verifyTokenCommand(mockToken)

    expect(result).toEqual(mockDecodedToken)
    expect(authMechanismMock.verify).toHaveBeenCalledWith(mockToken)
  })

  it('should throw an error if verify throws', () => {
    const authMechanismMock = {
      verify: jest.fn().mockImplementationOnce(() => {
        throw new Error('verify error')
      }),
    }

    const verifyTokenCommand = verifyToken(authMechanismMock as any as AuthMechanism)

    expect(() => verifyTokenCommand(mockToken)).toThrow('verify error')
  })
})
