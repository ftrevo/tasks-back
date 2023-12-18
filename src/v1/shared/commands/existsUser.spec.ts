import { faker } from '@faker-js/faker'
import { existsUser } from './existsUser'
import { Models } from '../../../infra'

describe('existsUser command', () => {
  const mockParams = {
    email: faker.internet.email(),
  }

  it('should return true if user exists', async () => {
    const UsersModelMock = {
      count: jest.fn().mockResolvedValueOnce(1),
    }

    const existsUserCommand = existsUser(UsersModelMock as any as Models['Users'])
    const result = await existsUserCommand(mockParams)

    expect(result).toEqual(true)
    expect(UsersModelMock.count).toHaveBeenCalledWith({ where: mockParams })
  })

  it('should return false if user does not exist', async () => {
    const UsersModelMock = {
      count: jest.fn().mockResolvedValueOnce(0),
    }

    const existsUserCommand = existsUser(UsersModelMock as any as Models['Users'])
    const result = await existsUserCommand(mockParams)

    expect(result).toEqual(false)
    expect(UsersModelMock.count).toHaveBeenCalledWith({ where: mockParams })
  })

  it('should throw an error if count throws', async () => {
    const UsersModelMock = {
      count: jest.fn().mockImplementationOnce(() => {
        throw new Error('count error')
      }),
    }

    const existsUserCommand = existsUser(UsersModelMock as any as Models['Users'])

    await expect(existsUserCommand(mockParams)).rejects.toThrow('count error')
  })
})
