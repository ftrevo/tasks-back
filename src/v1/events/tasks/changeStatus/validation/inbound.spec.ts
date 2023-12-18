import { faker } from '@faker-js/faker'
import { ZodError } from 'zod'
import { validateInboundParams } from './inbound'

describe('change task status inbound validation', () => {
  const mockData = {
    id: faker.number.int({ min: 1 }),
    status: faker.datatype.boolean(),
    field: 'frozen',
  }

  it('should pass and return a sanitized object', () => {
    const output = validateInboundParams({ ...mockData, should: 'be removed' } as any)

    expect(output).toEqual(mockData)
  })

  it('should pass for field done', () => {
    const output = validateInboundParams({ ...mockData, field: 'done' })

    expect(output).toEqual({ ...mockData, field: 'done' })
  })

  it('should throw an error if id is not a number', () => {
    const invalidParams = {
      ...mockData,
      id: 'not a number',
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if id is not an integer', () => {
    const invalidParams = {
      ...mockData,
      id: 3.14,
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if id is less than or equal to 0', () => {
    const invalidParams = {
      ...mockData,
      id: 0,
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if status is not a boolean', () => {
    const invalidParams = {
      ...mockData,
      status: 'not a boolean',
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if field is not a string', () => {
    const invalidParams = {
      ...mockData,
      field: 123,
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if field is not "frozen" or "done"', () => {
    const invalidParams = {
      ...mockData,
      field: 'invalid',
    }

    expect(() => validateInboundParams(invalidParams as any)).toThrow(ZodError)
  })
})
