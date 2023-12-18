import { faker } from '@faker-js/faker'
import { ZodError } from 'zod'
import { validateResponseObject } from './response'

describe('create user response validation', () => {
  const mockData = {
    token: faker.string.hexadecimal(),
    id: faker.number.int(),
    name: faker.person.fullName(),
  }

  it('should pass and return a sanitized object', () => {
    const optput = validateResponseObject({ ...mockData, should: 'be removed' } as any)

    expect(optput).toEqual(mockData)
  })

  it('should throw an error if token is not a string', () => {
    const invalidParams = {
      token: 123,
    }

    expect(() => validateResponseObject(invalidParams as any)).toThrow(ZodError)
  })
  it('should throw an error if name is not a string', () => {
    const invalidParams = {
      name: 123,
    }

    expect(() => validateResponseObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if id is not a number', () => {
    const invalidParams = {
      id: false,
    }

    expect(() => validateResponseObject(invalidParams as any)).toThrow(ZodError)
  })
})
