import { setupAuthCommands, type AuthDependencies } from './setupAuthCommands'

import { login } from './login/commands/login'

jest.mock('./login/commands/login', () => ({
  login: jest.fn().mockReturnValue(jest.fn()),
}))

afterAll(jest.restoreAllMocks)

describe('setupAuthCommands', () => {
  it('has all required exported commands', () => {
    const encrypt = { encrypt: 'here' }

    const mockCommands = {
      createToken: jest.fn(),
      findUser: jest.fn(),
    }

    const returned = setupAuthCommands({
      commands: mockCommands,
      encrypt,
    } as any as AuthDependencies)

    expect(returned).toEqual({
      loginCommand: expect.any(Function),
    })

    expect(login).toHaveBeenCalledWith({
      commands: {
        findUser: mockCommands.findUser,
        createToken: mockCommands.createToken,
      },
      encrypt,
    })
  })
})
