import { faker } from '@faker-js/faker'

import { createUser } from './createUser'

describe('createUser command', () => {
  const mockData = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
  }

  const mockId = faker.number.int()

  test('should create a user and return a token', async () => {
    const mockToken = faker.string.hexadecimal()

    const mockDependencies = {
      commands: {
        existsUser: jest.fn().mockResolvedValue(false),
        saveUser: jest.fn().mockResolvedValue({ ...mockData, id: mockId }),
        createToken: jest.fn().mockReturnValue(mockToken),
      },
    }

    const createUserCommand = createUser(mockDependencies)

    const output = await createUserCommand(mockData)

    expect(output).toEqual({ token: mockToken, id: mockId, name: mockData.name })
    expect(mockDependencies.commands.existsUser).toHaveBeenCalledWith({ email: mockData.email })
    expect(mockDependencies.commands.saveUser).toHaveBeenCalledWith(mockData)
    expect(mockDependencies.commands.createToken).toHaveBeenCalledWith({ ...mockData, id: mockId })
  })

  test('should throw due to email already being used', async () => {
    const mockDependencies = {
      commands: {
        existsUser: jest.fn().mockResolvedValue(true),
        saveUser: jest.fn(),
        createToken: jest.fn(),
      },
    }

    const createUserCommand = createUser(mockDependencies)

    await expect(createUserCommand(mockData)).rejects.toThrow('Email already used')

    expect(mockDependencies.commands.existsUser).toHaveBeenCalledWith({ email: mockData.email })
    expect(mockDependencies.commands.saveUser).not.toHaveBeenCalled()
    expect(mockDependencies.commands.createToken).not.toHaveBeenCalled()
  })

  test('should throw due to error when saving the user', async () => {
    const mockDependencies = {
      commands: {
        existsUser: jest.fn().mockResolvedValue(false),
        saveUser: jest.fn().mockRejectedValue(new Error('saveUser error')),
        createToken: jest.fn(),
      },
    }

    const createUserCommand = createUser(mockDependencies)

    await expect(createUserCommand(mockData)).rejects.toThrow('saveUser error')

    expect(mockDependencies.commands.existsUser).toHaveBeenCalledWith({ email: mockData.email })
    expect(mockDependencies.commands.saveUser).toHaveBeenCalledWith(mockData)
    expect(mockDependencies.commands.createToken).not.toHaveBeenCalled()
  })

  test('should throw due to error when generating the token', async () => {
    const mockDependencies = {
      commands: {
        existsUser: jest.fn().mockResolvedValue(false),
        saveUser: jest.fn().mockResolvedValue({ ...mockData, id: mockId }),
        createToken: jest.fn().mockImplementation(() => {
          throw new Error('createToken error')
        }),
      },
    }

    const createUserCommand = createUser(mockDependencies)

    await expect(createUserCommand(mockData)).rejects.toThrow('createToken error')

    expect(mockDependencies.commands.existsUser).toHaveBeenCalledWith({ email: mockData.email })
    expect(mockDependencies.commands.saveUser).toHaveBeenCalledWith(mockData)
    expect(mockDependencies.commands.createToken).toHaveBeenCalledWith({ ...mockData, id: mockId })
  })
})
