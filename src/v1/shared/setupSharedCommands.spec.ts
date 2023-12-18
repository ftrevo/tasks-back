import { setupSharedCommands, type SharedCommandsDependencies } from './setupSharedCommands'

import { createToken, existsUser, findUser, verifyToken, findAllTasks } from './commands'

jest.mock('./commands', () => ({
  createToken: jest.fn().mockReturnValue(jest.fn()),
  existsUser: jest.fn().mockReturnValue(jest.fn()),
  findUser: jest.fn().mockReturnValue(jest.fn()),
  verifyToken: jest.fn().mockReturnValue(jest.fn()),
  findAllTasks: jest.fn().mockReturnValue(jest.fn()),
}))

afterAll(jest.restoreAllMocks)

describe('setupSharedCommands', () => {
  it('has all required exported commands', () => {
    const mockDependencies = {
      models: { Users: {} },
      auth: {},
    }

    const returned = setupSharedCommands(mockDependencies as any as SharedCommandsDependencies)

    expect(returned).toEqual({
      createToken: expect.any(Function),
      findUser: expect.any(Function),
      verifyToken: expect.any(Function),
      existsUser: expect.any(Function),
      findAllTasks: expect.any(Function),
    })

    expect(createToken).toHaveBeenCalledWith(mockDependencies.auth)
    expect(findUser).toHaveBeenCalledWith(mockDependencies.models.Users)
    expect(verifyToken).toHaveBeenCalledWith(mockDependencies.auth)
    expect(existsUser).toHaveBeenCalledWith(mockDependencies.models.Users)
    expect(findAllTasks).toHaveBeenCalledWith(mockDependencies)
  })
})
