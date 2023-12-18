import { Request, Response } from 'express'
import { faker } from '@faker-js/faker'

import { createUser } from './action'

import { validateRequestParams, validateResponseObject } from './validation'

jest.mock('./validation', () => ({
  validateRequestParams: jest.fn(),
  validateResponseObject: jest.fn(),
}))

afterAll(jest.restoreAllMocks)

describe('create user action', () => {
  const mockId = faker.number.int({ min: 1 })
  const mockName = faker.person.fullName()

  const requestMock = {
    body: {
      email: faker.internet.email(),
      password: faker.string.alphanumeric({ length: 10 }),
      name: faker.person.fullName(),
    },
  }

  const jsonMock = jest.fn((payload) => payload)
  const responseMock = {
    status: jest.fn().mockReturnValue({
      json: jsonMock,
    }),
  }

  const nextMock = jest.fn()

  it('should create user', async () => {
    const mockToken = faker.string.hexadecimal()
    const createUserCommandMock = jest.fn().mockResolvedValue({ token: mockToken, name: mockName, id: mockId })

    ;(validateRequestParams as jest.MockedFunction<typeof validateRequestParams>).mockReturnValue(requestMock.body)
    ;(validateResponseObject as jest.MockedFunction<typeof validateResponseObject>).mockReturnValue({
      token: mockToken,
      name: mockName,
      id: mockId,
    })

    const createUserAction = createUser(createUserCommandMock)
    const output = await createUserAction(requestMock as any as Request, responseMock as any as Response, nextMock)

    expect(output).toEqual({ token: mockToken, name: mockName, id: mockId })
    expect(validateRequestParams).toHaveBeenCalledWith(requestMock.body)
    expect(createUserCommandMock).toHaveBeenCalledWith(requestMock.body)
    expect(responseMock.status).toHaveBeenCalledWith(201)
    expect(jsonMock).toHaveBeenCalledWith({ token: mockToken, name: mockName, id: mockId })
    expect(validateResponseObject).toHaveBeenCalledWith({ token: mockToken, name: mockName, id: mockId })
    expect(nextMock).not.toHaveBeenCalled()
  })

  it('should forward the error if validateRequestParams throws', async () => {
    const createUserCommandMock = jest.fn()
    const mockError = new Error('inbound validation error')
    ;(validateRequestParams as jest.MockedFunction<typeof validateRequestParams>).mockImplementation(() => {
      throw mockError
    })

    const createUserAction = createUser(createUserCommandMock)
    await createUserAction(requestMock as any as Request, responseMock as any as Response, nextMock)

    expect(nextMock).toHaveBeenCalledWith(mockError)
    expect(validateRequestParams).toHaveBeenCalledWith(requestMock.body)

    expect(createUserCommandMock).not.toHaveBeenCalled()
    expect(responseMock.status).not.toHaveBeenCalled()
    expect(jsonMock).not.toHaveBeenCalled()
    expect(validateResponseObject).not.toHaveBeenCalled()
  })

  it('should forward the error if createUserCommand throws', async () => {
    const mockError = new Error('createUserCommand error')
    const createUserCommandMock = jest.fn().mockRejectedValue(mockError)
    ;(validateRequestParams as jest.MockedFunction<typeof validateRequestParams>).mockReturnValue(requestMock.body)

    const createUserAction = createUser(createUserCommandMock)
    await createUserAction(requestMock as any as Request, responseMock as any as Response, nextMock)

    expect(nextMock).toHaveBeenCalledWith(mockError)
    expect(validateRequestParams).toHaveBeenCalledWith(requestMock.body)
    expect(createUserCommandMock).toHaveBeenCalledWith(requestMock.body)

    expect(validateResponseObject).not.toHaveBeenCalled()
    expect(responseMock.status).not.toHaveBeenCalled()
    expect(jsonMock).not.toHaveBeenCalled()
  })

  it('should forward the error if validateResponseObject throws', async () => {
    const mockError = new Error('outbound validation error')
    const createUserCommandMock = jest.fn().mockResolvedValue({ incorrect: 'data' })

    ;(validateRequestParams as jest.MockedFunction<typeof validateRequestParams>).mockReturnValue(requestMock.body)
    ;(validateResponseObject as jest.MockedFunction<typeof validateResponseObject>).mockImplementation(() => {
      throw mockError
    })

    const createUserAction = createUser(createUserCommandMock)
    await createUserAction(requestMock as any as Request, responseMock as any as Response, nextMock)

    expect(nextMock).toHaveBeenCalledWith(mockError)
    expect(validateRequestParams).toHaveBeenCalledWith(requestMock.body)
    expect(createUserCommandMock).toHaveBeenCalledWith(requestMock.body)
    expect(validateResponseObject).toHaveBeenCalledWith({ incorrect: 'data' })

    expect(responseMock.status).not.toHaveBeenCalled()
    expect(jsonMock).not.toHaveBeenCalled()
  })
})
