import { faker } from '@faker-js/faker'
import { ZodError } from 'zod'
import { validateInboundParams } from './inbound'

describe('create subtask inbound validation', () => {
  const mockData = {
    name: faker.lorem.words(3),
    price: faker.number.int({ min: 1, max: 2147483647 }),
    taskId: faker.number.int({ min: 1 }),
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

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
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

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if price is not an integer', () => {
    const invalidParams = {
      ...mockData,
      price: 3.14,
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should pass if price is not provided', () => {
    const validParams = {
      ...mockData,
      price: undefined,
    }

    const output = validateInboundParams(validParams)

    expect(output).toEqual(validParams)
  })

  it('should throw an error if taskId is not a number', () => {
    const invalidParams = {
      ...mockData,
      taskId: 'not a number',
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if taskId is not an integer', () => {
    const invalidParams = {
      ...mockData,
      taskId: 3.14,
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if taskId is less than 0', () => {
    const invalidParams = {
      ...mockData,
      taskId: -1,
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if name is missing', () => {
    const invalidParams = {
      ...mockData,
      name: undefined,
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if taskId is missing', () => {
    const invalidParams = {
      ...mockData,
      taskId: undefined,
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })
})
