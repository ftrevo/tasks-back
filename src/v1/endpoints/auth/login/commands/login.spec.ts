import { faker } from '@faker-js/faker'
import { LoginDependencies, login } from './login'

describe('login command', () => {
  const findUserMock = jest.fn()
  const createTokenMock = jest.fn()
  const comparePasswordMock = jest.fn()

  const loginDeps = {
    commands: {
      findUser: findUserMock,
      createToken: createTokenMock,
    },
    encrypt: {
      comparePassword: comparePasswordMock,
    },
  }

  const mockData = {
    id: faker.number.int(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  it('should perform successful login', async () => {
    findUserMock.mockResolvedValueOnce(mockData)
    comparePasswordMock.mockReturnValueOnce(true)
    createTokenMock.mockReturnValueOnce('validToken')

    const loginCommand = login(loginDeps as any as LoginDependencies)
    const result = await loginCommand(mockData)

    expect(result).toEqual({ token: 'validToken', id: mockData.id, name: mockData.name })
    expect(findUserMock).toHaveBeenCalledWith({ email: mockData.email })
    expect(comparePasswordMock).toHaveBeenCalledWith(mockData.password, mockData.password)
    expect(createTokenMock).toHaveBeenCalledWith(mockData)
  })

  it('should throw an error if no user is returned by findUser', async () => {
    findUserMock.mockResolvedValueOnce(null)

    const loginCommand = login(loginDeps as any as LoginDependencies)

    await expect(loginCommand(mockData)).rejects.toThrow('User not found or incorrect password')
  })

  it('should throw an error if comparePassword returns false', async () => {
    findUserMock.mockResolvedValueOnce(mockData)
    comparePasswordMock.mockReturnValueOnce(false)

    const loginCommand = login(loginDeps as any as LoginDependencies)

    await expect(loginCommand(mockData)).rejects.toThrow('User not found or incorrect password')
  })

  it('should throw an error if findUser throws', async () => {
    findUserMock.mockRejectedValueOnce(new Error('findUser error'))

    const loginCommand = login(loginDeps as any as LoginDependencies)

    await expect(loginCommand(mockData)).rejects.toThrow('findUser error')
  })

  it('should throw an error if comparePassword throws', async () => {
    findUserMock.mockResolvedValueOnce(mockData)
    comparePasswordMock.mockImplementationOnce(() => {
      throw new Error('comparePassword error')
    })

    const loginCommand = login(loginDeps as any as LoginDependencies)

    await expect(loginCommand(mockData)).rejects.toThrow('comparePassword error')
  })

  it('should throw an error if createToken throws', async () => {
    findUserMock.mockResolvedValueOnce(mockData)
    comparePasswordMock.mockReturnValueOnce(true)
    createTokenMock.mockImplementationOnce(() => {
      throw new Error('createToken error')
    })

    const loginCommand = login(loginDeps as any as LoginDependencies)

    await expect(loginCommand(mockData)).rejects.toThrow('createToken error')
  })
})
