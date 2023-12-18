import { resetUserPassword } from './resetPassword' // replace this with actual path.
import { faker } from '@faker-js/faker'

describe('resetPassword command', () => {
  const mockUser = {
    update: jest.fn().mockResolvedValue(null),
  }

  const mockData = {
    email: faker.internet.email(),
  }

  it('should send reset password email', async () => {
    const mockResetCode = faker.string.hexadecimal({ length: 6 })

    const mockDependencies = {
      commands: {
        findUser: jest.fn().mockResolvedValue(mockUser),
        sendEmail: jest.fn().mockResolvedValue(null),
        createRandomCode: jest.fn().mockReturnValue(mockResetCode),
      },
    }

    const resetPasswordCommand = resetUserPassword(mockDependencies)

    await resetPasswordCommand(mockData)
    expect(mockDependencies.commands.findUser).toHaveBeenCalledWith(mockData)
    expect(mockUser.update).toHaveBeenCalledWith({ resetCode: mockResetCode })
    expect(mockDependencies.commands.sendEmail).toHaveBeenCalledWith({ ...mockData, resetCode: mockResetCode })
  })

  it('should throw an error if the user is not found', async () => {
    const mockDependencies = {
      commands: {
        findUser: jest.fn().mockResolvedValue(undefined),
        sendEmail: jest.fn(),
        createRandomCode: jest.fn(),
      },
    }

    const resetPasswordCommand = resetUserPassword(mockDependencies)

    await expect(resetPasswordCommand(mockData)).rejects.toThrow('User not found')

    expect(mockDependencies.commands.findUser).toHaveBeenCalledWith(mockData)
    expect(mockDependencies.commands.sendEmail).not.toHaveBeenCalled()
  })

  it('should throw an error if findUser throws', async () => {
    const mockDependencies = {
      commands: {
        findUser: jest.fn().mockRejectedValue(new Error('findUser error')),
        sendEmail: jest.fn(),
        createRandomCode: jest.fn(),
      },
    }

    const resetPasswordCommand = resetUserPassword(mockDependencies)

    await expect(resetPasswordCommand(mockData)).rejects.toThrow('findUser error')

    expect(mockDependencies.commands.findUser).toHaveBeenCalledWith(mockData)
    expect(mockDependencies.commands.sendEmail).not.toHaveBeenCalled()
  })

  it('should throw an error if user.update throws', async () => {
    const mockResetCode = faker.string.hexadecimal({ length: 6 })

    const mockUser = {
      update: jest.fn().mockRejectedValue(new Error('user.update error')),
    }

    const mockDependencies = {
      commands: {
        findUser: jest.fn().mockResolvedValue(mockUser),
        sendEmail: jest.fn(),
        createRandomCode: jest.fn().mockReturnValue(mockResetCode),
      },
    }

    const resetPasswordCommand = resetUserPassword(mockDependencies)

    await expect(resetPasswordCommand(mockData)).rejects.toThrow('user.update error')

    expect(mockDependencies.commands.findUser).toHaveBeenCalledWith(mockData)
    expect(mockUser.update).toHaveBeenCalledWith({ resetCode: mockResetCode })
    expect(mockDependencies.commands.sendEmail).not.toHaveBeenCalled()
  })

  it('should throw an error if sendEmail throws', async () => {
    const mockResetCode = faker.string.hexadecimal({ length: 6 })

    const mockDependencies = {
      commands: {
        findUser: jest.fn().mockResolvedValue(mockUser),
        sendEmail: jest.fn().mockRejectedValue(new Error('sendEmail error')),
        createRandomCode: jest.fn().mockReturnValue(mockResetCode),
      },
    }

    const resetPasswordCommand = resetUserPassword(mockDependencies)

    await expect(resetPasswordCommand(mockData)).rejects.toThrow('sendEmail error')

    expect(mockDependencies.commands.findUser).toHaveBeenCalledWith(mockData)
    expect(mockUser.update).toHaveBeenCalled()
    expect(mockDependencies.commands.sendEmail).toHaveBeenCalledWith({ ...mockData, resetCode: mockResetCode })
  })
})
