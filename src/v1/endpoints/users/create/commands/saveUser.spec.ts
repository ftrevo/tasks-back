import { faker } from '@faker-js/faker'

import { saveUser } from './saveUser'
import type { Models } from '../../../../../infra'

describe('saveUser command', () => {
  const mockData = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
  }

  const mockId = faker.number.int()

  test('should save user and return the saved user', async () => {
    const mockData = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    }

    const mockUserInstance = {
      ...mockData,
      id: mockId,
      save: jest.fn(),
    }
    mockUserInstance.save.mockResolvedValue(mockUserInstance)

    const mockDependencies = {
      Users: {
        build: jest.fn().mockReturnValue(mockUserInstance),
      } as any as Models['Users'],
    }

    const saveUserCommand = saveUser(mockDependencies)

    const output = await saveUserCommand(mockData)

    expect(output).toEqual(mockUserInstance)
    expect(mockDependencies.Users.build).toHaveBeenCalledWith(mockData)
    expect(mockUserInstance.save).toHaveBeenCalled()
  })

  test('should throw due to error when saving the user', async () => {
    const mockUserInstance = {
      ...mockData,
      id: mockId,
      save: jest.fn().mockRejectedValue(new Error('save error')),
    }

    const mockDependencies = {
      Users: {
        build: jest.fn().mockReturnValue(mockUserInstance),
      } as any as Models['Users'],
    }

    const saveUserCommand = saveUser(mockDependencies)

    await expect(saveUserCommand(mockData)).rejects.toThrow('save error')

    expect(mockDependencies.Users.build).toHaveBeenCalledWith(mockData)
    expect(mockUserInstance.save).toHaveBeenCalled()
  })
})
