import { changeUserPassword } from './changePassword' // replace this with actual path.
import { faker } from '@faker-js/faker'

describe('changePassword command', () => {
  const mockEmail = faker.internet.email()
  const mockResetCode = faker.string.hexadecimal({ length: 6 })

  const mockData = {
    email: mockEmail,
    resetCode: mockResetCode,
    password: faker.internet.password(),
  }

  const mockUser = {
    ...mockData,
    update: jest.fn().mockResolvedValue(null),
  }

  it('should change password', async () => {
    const mockToken = faker.string.hexadecimal()

    const mockDependencies = {
      commands: {
        findUser: jest.fn().mockResolvedValue(mockUser),
        createToken: jest.fn().mockReturnValue(mockToken),
      },
    }

    const changePasswordCommand = changeUserPassword(mockDependencies)

    await changePasswordCommand(mockData)
    expect(mockDependencies.commands.findUser).toHaveBeenCalledWith({
      email: mockData.email,
      resetCode: mockData.resetCode,
    })
    expect(mockUser.update).toHaveBeenCalledWith({ password: mockData.password })
    expect(mockDependencies.commands.createToken).toHaveBeenCalledWith(mockUser)
  })

  it('should throw an error if the user is not found', async () => {
    const mockDependencies = {
      commands: {
        findUser: jest.fn().mockResolvedValue(undefined),
        createToken: jest.fn(),
      },
    }

    const changePasswordCommand = changeUserPassword(mockDependencies)

    await expect(changePasswordCommand(mockData)).rejects.toThrow('Invalid email or reset code')

    expect(mockDependencies.commands.findUser).toHaveBeenCalledWith({
      email: mockData.email,
      resetCode: mockData.resetCode,
    })
    expect(mockDependencies.commands.createToken).not.toHaveBeenCalled()
  })

  it('should throw an error if findUser throws', async () => {
    const mockDependencies = {
      commands: {
        findUser: jest.fn().mockRejectedValue(new Error('findUser error')),
        createToken: jest.fn(),
      },
    }

    const changePasswordCommand = changeUserPassword(mockDependencies)

    await expect(changePasswordCommand(mockData)).rejects.toThrow('findUser error')

    expect(mockDependencies.commands.findUser).toHaveBeenCalledWith({
      email: mockData.email,
      resetCode: mockData.resetCode,
    })
    expect(mockDependencies.commands.createToken).not.toHaveBeenCalled()
  })

  it('should throw an error if user.update throws', async () => {
    const mockUserUpdate = {
      ...mockUser,
      update: jest.fn().mockRejectedValue(new Error('user.update error')),
    }

    const mockDependencies = {
      commands: {
        findUser: jest.fn().mockResolvedValue(mockUserUpdate),
        createToken: jest.fn(),
      },
    }

    const changePasswordCommand = changeUserPassword(mockDependencies)

    await expect(changePasswordCommand(mockData)).rejects.toThrow('user.update error')

    expect(mockDependencies.commands.findUser).toHaveBeenCalledWith({
      email: mockData.email,
      resetCode: mockData.resetCode,
    })
    expect(mockUserUpdate.update).toHaveBeenCalledWith({ password: mockData.password })
    expect(mockDependencies.commands.createToken).not.toHaveBeenCalled()
  })

  it('should throw an error if createToken throws', async () => {
    const mockDependencies = {
      commands: {
        findUser: jest.fn().mockResolvedValue(mockUser),
        createToken: jest.fn().mockImplementation(() => {
          throw new Error('createToken error')
        }),
      },
    }

    const changePasswordCommand = changeUserPassword(mockDependencies)

    await expect(changePasswordCommand(mockData)).rejects.toThrow('createToken error')

    expect(mockDependencies.commands.findUser).toHaveBeenCalledWith({
      email: mockData.email,
      resetCode: mockData.resetCode,
    })
    expect(mockUser.update).toHaveBeenCalledWith({ password: mockData.password })
    expect(mockDependencies.commands.createToken).toHaveBeenCalledWith(mockUser)
  })
})
