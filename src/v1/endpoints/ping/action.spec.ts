import { Request, Response } from 'express'

import { ping } from './action'

import { validateResponseObject } from './validation/response'
import { pingCommand } from './commands/ping'

jest.mock('./validation/response', () => ({
  validateResponseObject: jest.fn(),
}))

jest.mock('./commands/ping', () => ({
  pingCommand: jest.fn(),
}))

afterAll(jest.restoreAllMocks)

describe('ping action', () => {
  const jsonMock = jest.fn((payload) => payload)
  const responseMock = {
    status: jest.fn().mockReturnValue({
      json: jsonMock,
    }),
  }

  const nextMock = jest.fn()

  it('should return status', async () => {
    const mockStatus = { status: 'ok' } as const

    ;(validateResponseObject as jest.MockedFunction<typeof validateResponseObject>).mockReturnValue(mockStatus)
    ;(pingCommand as jest.MockedFunction<typeof pingCommand>).mockReturnValue(mockStatus)

    const output = await ping({} as any as Request, responseMock as any as Response, nextMock)

    expect(output).toEqual(mockStatus)
    expect(pingCommand).toHaveBeenCalled()
    expect(responseMock.status).toHaveBeenCalledWith(200)
    expect(jsonMock).toHaveBeenCalledWith(mockStatus)
    expect(validateResponseObject).toHaveBeenCalledWith(mockStatus)
    expect(nextMock).not.toHaveBeenCalled()
  })

  it('should forward the error if validateResponseObject throws', async () => {
    const mockIncorrectData = { incorrect: 'data' }
    const mockError = new Error('outbound validation error')
    ;(validateResponseObject as jest.MockedFunction<typeof validateResponseObject>).mockImplementation(() => {
      throw mockError
    })
    ;(pingCommand as jest.MockedFunction<typeof pingCommand>).mockReturnValue(mockIncorrectData as any)

    await ping({} as any as Request, responseMock as any as Response, nextMock)

    expect(nextMock).toHaveBeenCalledWith(mockError)
    expect(pingCommand).toHaveBeenCalled()
    expect(validateResponseObject).toHaveBeenCalledWith(mockIncorrectData)

    expect(responseMock.status).not.toHaveBeenCalled()
    expect(jsonMock).not.toHaveBeenCalled()
  })
})
