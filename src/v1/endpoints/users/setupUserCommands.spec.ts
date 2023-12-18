import { setupUsersCommands, type UsersDependencies } from './setupUserCommands'

import { changeUserPassword } from './changePassword/commands/changePassword'
import { createUser } from './create/commands/createUser'
import { resetUserPassword } from './resetPassword/commands/resetPassword'
import { saveUser } from './create/commands/saveUser'
import { sendEmail } from './resetPassword/commands/sendEmail'

jest.mock('./changePassword/commands/changePassword', () => ({
  changeUserPassword: jest.fn().mockReturnValue(jest.fn()),
}))
jest.mock('./resetPassword/commands/createRandomCode', () => ({
  createRandomCode: jest.fn().mockReturnValue(jest.fn()),
}))
jest.mock('./create/commands/createUser', () => ({
  createUser: jest.fn().mockReturnValue(jest.fn()),
}))
jest.mock('./resetPassword/commands/resetPassword', () => ({
  resetUserPassword: jest.fn().mockReturnValue(jest.fn()),
}))
jest.mock('./create/commands/saveUser', () => ({
  saveUser: jest.fn().mockReturnValue(jest.fn()),
}))
jest.mock('./resetPassword/commands/sendEmail', () => ({
  sendEmail: jest.fn().mockReturnValue(jest.fn()),
}))

afterAll(jest.restoreAllMocks)

describe('setupUserCommands', () => {
  it('has all required exported commands', () => {
    const mockModel = { models: 'here' }
    const mockMailer = { mailer: 'nere' }

    const mockCommands = {
      createToken: jest.fn(),
      findUser: jest.fn(),
      existsUser: jest.fn(),
    }

    const returned = setupUsersCommands({
      models: mockModel,
      commands: mockCommands,
      mailer: mockMailer,
    } as any as UsersDependencies)

    expect(returned).toEqual({
      createCommand: expect.any(Function),
      resetPasswordCommand: expect.any(Function),
      changePasswordCommand: expect.any(Function),
    })

    expect(saveUser).toHaveBeenCalledWith(mockModel)
    expect(sendEmail).toHaveBeenCalledWith(mockMailer)

    expect(createUser).toHaveBeenCalledWith({
      commands: {
        saveUser: expect.any(Function),
        createToken: mockCommands.createToken,
        existsUser: mockCommands.existsUser,
      },
    })

    expect(resetUserPassword).toHaveBeenCalledWith({
      commands: {
        sendEmail: expect.any(Function),
        findUser: mockCommands.findUser,
        createRandomCode: expect.any(Function),
      },
    })

    expect(changeUserPassword).toHaveBeenCalledWith({
      commands: {
        findUser: mockCommands.findUser,
        createToken: mockCommands.createToken,
      },
    })
  })
})
