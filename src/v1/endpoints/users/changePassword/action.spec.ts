import { Request, Response } from 'express'
import { faker } from '@faker-js/faker'

import { changePassword } from './action'

import { validateRequestParams, validateResponseObject } from './validation'

jest.mock('./validation', () => ({
  validateRequestParams: jest.fn(),
  validateResponseObject: jest.fn(),
}))

afterAll(jest.restoreAllMocks)

describe('change password user action', () => {
  const mockId = faker.number.int({ min: 1 })
  const mockName = faker.person.fullName()

  const requestMock = {
    body: {
      email: faker.internet.email(),
      password: faker.string.alphanumeric({ length: 10 }),
      resetCode: faker.string.alphanumeric({ length: 6 }),
    },
  }

  const jsonMock = jest.fn((payload) => payload)
  const responseMock = {
    status: jest.fn().mockReturnValue({
      json: jsonMock,
    }),
  }

  const nextMock = jest.fn()

  it('should change password', async () => {
    const mockToken = faker.string.hexadecimal()
    const changePasswordCommandMock = jest.fn().mockResolvedValue({ token: mockToken, name: mockName, id: mockId })
    ;(validateRequestParams as jest.MockedFunction<typeof validateRequestParams>).mockReturnValue(requestMock.body)
    ;(validateResponseObject as jest.MockedFunction<typeof validateResponseObject>).mockReturnValue({
      token: mockToken,
      name: mockName,
      id: mockId,
    })

    const changePasswordAction = changePassword(changePasswordCommandMock)
    const output = await changePasswordAction(requestMock as any as Request, responseMock as any as Response, nextMock)

    expect(output).toEqual({ token: mockToken, name: mockName, id: mockId })
    expect(validateRequestParams).toHaveBeenCalledWith(requestMock.body)
    expect(changePasswordCommandMock).toHaveBeenCalledWith(requestMock.body)
    expect(responseMock.status).toHaveBeenCalledWith(200)
    expect(jsonMock).toHaveBeenCalledWith({ token: mockToken, name: mockName, id: mockId })
    expect(validateResponseObject).toHaveBeenCalledWith({ token: mockToken, name: mockName, id: mockId })
    expect(nextMock).not.toHaveBeenCalled()
  })

  it('should forward the error if validateRequestParams throws', async () => {
    const mockError = new Error('inbound validation error')
    const changePasswordCommandMock = jest.fn()
    ;(validateRequestParams as jest.MockedFunction<typeof validateRequestParams>).mockImplementation(() => {
      throw mockError
    })

    const changePasswordAction = changePassword(changePasswordCommandMock)
    await changePasswordAction(requestMock as any as Request, responseMock as any as Response, nextMock)

    expect(nextMock).toHaveBeenCalledWith(mockError)
    expect(validateRequestParams).toHaveBeenCalledWith(requestMock.body)

    expect(changePasswordCommandMock).not.toHaveBeenCalled()
    expect(responseMock.status).not.toHaveBeenCalled()
    expect(jsonMock).not.toHaveBeenCalled()
    expect(validateResponseObject).not.toHaveBeenCalled()
  })

  it('should forward the error if changePasswordCommand throws', async () => {
    const mockError = new Error('changePasswordCommand error')
    const changePasswordCommandMock = jest.fn().mockRejectedValue(mockError)
    ;(validateRequestParams as jest.MockedFunction<typeof validateRequestParams>).mockReturnValue(requestMock.body)

    const changePasswordAction = changePassword(changePasswordCommandMock)
    await changePasswordAction(requestMock as any as Request, responseMock as any as Response, nextMock)

    expect(nextMock).toHaveBeenCalledWith(mockError)
    expect(validateRequestParams).toHaveBeenCalledWith(requestMock.body)
    expect(changePasswordCommandMock).toHaveBeenCalledWith(requestMock.body)

    expect(validateResponseObject).not.toHaveBeenCalled()
    expect(responseMock.status).not.toHaveBeenCalled()
    expect(jsonMock).not.toHaveBeenCalled()
  })

  it('should forward the error if validateResponseObject throws', async () => {
    const mockError = new Error('outbound validation error')
    const changePasswordCommandMock = jest.fn().mockResolvedValue({ incorrect: 'data' })
    ;(validateRequestParams as jest.MockedFunction<typeof validateRequestParams>).mockReturnValue(requestMock.body)
    ;(validateResponseObject as jest.MockedFunction<typeof validateResponseObject>).mockImplementation(() => {
      throw mockError
    })

    const changePasswordAction = changePassword(changePasswordCommandMock)
    await changePasswordAction(requestMock as any as Request, responseMock as any as Response, nextMock)

    expect(nextMock).toHaveBeenCalledWith(mockError)
    expect(validateRequestParams).toHaveBeenCalledWith(requestMock.body)
    expect(changePasswordCommandMock).toHaveBeenCalledWith(requestMock.body)
    expect(validateResponseObject).toHaveBeenCalledWith({ incorrect: 'data' })

    expect(responseMock.status).not.toHaveBeenCalled()
    expect(jsonMock).not.toHaveBeenCalled()
  })
})
