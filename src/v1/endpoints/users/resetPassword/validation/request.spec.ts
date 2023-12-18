import { faker } from '@faker-js/faker'
import { ZodError } from 'zod'
import { validateRequestParams } from './request'

describe('reset password request validation', () => {
  const mockData = {
    email: faker.internet.email(),
  }

  it('should pass and return a sanitized object', () => {
    const optput = validateRequestParams({ ...mockData, should: 'be removed' } as any)

    expect(optput).toEqual(mockData)
  })

  it('should throw an error if email is not a string', () => {
    const invalidParams = {
      ...mockData,
      email: 123,
    }

    expect(() => validateRequestParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if email is not a valid email', () => {
    const invalidParams = {
      ...mockData,
      email: 'invalidemail',
    }

    expect(() => validateRequestParams(invalidParams)).toThrow(ZodError)
  })
})
