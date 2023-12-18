import { faker } from '@faker-js/faker'
import { ZodError } from 'zod'
import { validateInboundParams } from './inbound'

describe('create task inbound validation', () => {
  const mockData = {
    name: faker.lorem.words(3),
    price: faker.number.int({ min: 1, max: 2147483647 }),
  }

  it('should pass and return a sanitized object', () => {
    const output = validateInboundParams({ ...mockData, should: 'be removed' } as any)

    expect(output).toEqual(mockData)
  })

  it('should throw an error if name is a string with less than 1 character', () => {
    const invalidParams = {
      ...mockData,
      name: '',
    }

    expect(() => validateInboundParams(invalidParams)).toThrow(ZodError)
  })

  it('should throw an error if name is not a string', () => {
    const invalidParams = {
      ...mockData,
      name: 123,
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if price is not a number', () => {
    const invalidParams = {
      ...mockData,
      price: 'not a number',
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if price is a negative number', () => {
    const invalidParams = {
      ...mockData,
      price: -1,
    }

    expect(() => validateInboundParams(invalidParams)).toThrow(ZodError)
  })

  it('should throw an error if price is not an integer', () => {
    const invalidParams = {
      ...mockData,
      price: 3.14,
    }

    expect(() => validateInboundParams(invalidParams)).toThrow(ZodError)
  })

  it('should pass if price is not provided', () => {
    const validParams = {
      ...mockData,
      price: undefined,
    }

    const output = validateInboundParams(validParams)

    expect(output).toEqual(validParams)
  })
})
