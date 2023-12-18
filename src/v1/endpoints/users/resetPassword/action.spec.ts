import { Request, Response } from 'express'
import { resetPassword } from './action'

import { validateRequestParams } from './validation'
import { faker } from '@faker-js/faker'
jest.mock('./validation', () => ({
  validateRequestParams: jest.fn(),
}))

afterAll(jest.restoreAllMocks)

describe('reset password action', () => {
  const resetUserCommandMock = jest.fn()

  const requestMock = {
    body: {
      email: faker.internet.email(),
    },
  }

  const responseMock = {
    sendStatus: jest.fn(),
  }

  const nextMock = jest.fn()

  it('should successfully reset password', async () => {
    ;(validateRequestParams as jest.MockedFunction<typeof validateRequestParams>).mockReturnValue(requestMock.body)
    const resetPasswordAction = resetPassword(resetUserCommandMock)

    await resetPasswordAction(requestMock as any as Request, responseMock as any as Response, nextMock)

    expect(resetUserCommandMock).toHaveBeenCalledWith(requestMock.body)
    expect(responseMock.sendStatus).toHaveBeenCalledWith(204)
  })

  it('should throw an error if validateRequestParams throws', async () => {
    const mockError = new Error('validation error')

    ;(validateRequestParams as jest.MockedFunction<typeof validateRequestParams>).mockImplementation(() => {
      throw mockError
    })

    const resetPasswordAction = resetPassword(resetUserCommandMock)

    await resetPasswordAction(requestMock as any as Request, responseMock as any as Response, nextMock)

    expect(nextMock).toHaveBeenCalledWith(mockError)
  })
})
