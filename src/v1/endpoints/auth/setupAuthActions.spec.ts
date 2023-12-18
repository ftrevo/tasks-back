import { setupAuthActions } from './setupAuthActions'

jest.mock('./setupAuthCommands', () => ({
  setupAuthCommands: jest.fn().mockReturnValue({
    loginCommand: jest.fn(),
  }),
}))

afterAll(jest.restoreAllMocks)

describe('setupAuthActions', () => {
  it('has all required exported actions', () => {
    const returned = setupAuthActions({} as any)

    expect(returned).toEqual({
      login: expect.any(Function),
    })
  })
})
