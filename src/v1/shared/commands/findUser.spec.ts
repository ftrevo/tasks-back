import { faker } from '@faker-js/faker'
import { findUser } from './findUser'
import { Models } from '../../../infra'

describe('findUser command', () => {
  const mockParams = {
    email: faker.internet.email(),
  }

  it('should find a user with email only', async () => {
    const mockUser = {
      ...mockParams,
      id: faker.number.int({ min: 1 }),
      name: faker.person.fullName(),
    }

    const UsersModelMock = {
      findOne: jest.fn().mockResolvedValueOnce(mockUser),
    }

    const findUserCommand = findUser(UsersModelMock as any as Models['Users'])
    const result = await findUserCommand(mockParams)

    expect(result).toEqual(mockUser)
    expect(UsersModelMock.findOne).toHaveBeenCalledWith({ where: mockParams })
  })

  it('should find a user with email and resetCode', async () => {
    const mockUser = {
      ...mockParams,
      id: faker.number.int({ min: 1 }),
      name: faker.person.fullName(),
    }

    const mockResetCode = faker.string.hexadecimal({ length: 6 })

    const UsersModelMock = {
      findOne: jest.fn().mockResolvedValueOnce(mockUser),
    }

    const findUserCommand = findUser(UsersModelMock as any as Models['Users'])
    const result = await findUserCommand({ ...mockParams, resetCode: mockResetCode })

    expect(result).toEqual(mockUser)
    expect(UsersModelMock.findOne).toHaveBeenCalledWith({ where: { ...mockParams, resetCode: mockResetCode } })
  })

  it('should return null if no user is found', async () => {
    const UsersModelMock = {
      findOne: jest.fn().mockResolvedValueOnce(null),
    }

    const findUserCommand = findUser(UsersModelMock as any as Models['Users'])
    const result = await findUserCommand(mockParams)

    expect(result).toEqual(null)
    expect(UsersModelMock.findOne).toHaveBeenCalledWith({ where: mockParams })
  })

  it('should throw an error if findOne throws', async () => {
    const UsersModelMock = {
      findOne: jest.fn().mockImplementationOnce(() => {
        throw new Error('findOne error')
      }),
    }

    const findUserCommand = findUser(UsersModelMock as any as Models['Users'])

    await expect(findUserCommand(mockParams)).rejects.toThrow('findOne error')
  })
})
