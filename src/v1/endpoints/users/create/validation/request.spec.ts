import { faker } from '@faker-js/faker'
import { ZodError } from 'zod'
import { validateRequestParams } from './request'

describe('create user request validation', () => {
  const mockData = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
  }

  it('should pass and return a sanitized object', () => {
    const optput = validateRequestParams({ ...mockData, should: 'be removed' } as any)

    expect(optput).toEqual(mockData)
  })

  it('should throw an error if name is a string with less than 1 character', () => {
    const invalidParams = {
      ...mockData,
      name: '',
    }

    expect(() => validateRequestParams(invalidParams)).toThrow(ZodError)
  })

  it('should throw an error if password is not a string', () => {
    const invalidParams = {
      ...mockData,
      password: false,
    }

    expect(() => validateRequestParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if password is a string with less than 5 characters', () => {
    const invalidParams = {
      ...mockData,
      password: '1234',
    }

    expect(() => validateRequestParams(invalidParams)).toThrow(ZodError)
  })

  it('should throw an error if name is not a string', () => {
    const invalidParams = {
      ...mockData,
      name: 123,
    }

    expect(() => validateRequestParams(invalidParams as any)).toThrow(ZodError)
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
