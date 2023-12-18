import { setupUsersActions } from './setupUserActions'

jest.mock('./setupUserCommands', () => ({
  setupUsersCommands: jest.fn().mockReturnValue({
    createCommand: jest.fn(),
    resetPasswordCommand: jest.fn(),
    changePasswordCommand: jest.fn(),
  }),
}))

afterAll(jest.restoreAllMocks)

describe('setupUserActions', () => {
  it('has all required exported actions', () => {
    const returned = setupUsersActions({} as any)

    expect(returned).toEqual({
      create: expect.any(Function),
      resetPassword: expect.any(Function),
      changePassword: expect.any(Function),
    })
  })
})
