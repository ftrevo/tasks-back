import { faker } from '@faker-js/faker'
import { ZodError } from 'zod'
import { validateOutboundObject } from './outbound'

describe('change task status outbound validation', () => {
  const mockData = {
    id: faker.number.int({ min: 1 }),
    status: faker.datatype.boolean(),
    field: 'done',
  }

  it('should pass and return a sanitized object', () => {
    const output = validateOutboundObject({ ...mockData, should: 'be removed' } as any)

    expect(output).toEqual(mockData)
  })

  it('should pass for field frozen', () => {
    const output = validateOutboundObject({ ...mockData, field: 'frozen' })

    expect(output).toEqual({ ...mockData, field: 'frozen' })
  })

  it('should throw an error if id is not a number', () => {
    const invalidParams = {
      ...mockData,
      id: 'not a number',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if id is not an integer', () => {
    const invalidParams = {
      ...mockData,
      id: 3.14,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if id is less than or equal to 0', () => {
    const invalidParams = {
      ...mockData,
      id: 0,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if status is not a boolean', () => {
    const invalidParams = {
      ...mockData,
      status: 'not a boolean',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if field is not a string', () => {
    const invalidParams = {
      ...mockData,
      field: 123,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if field is not "frozen" or "done"', () => {
    const invalidParams = {
      ...mockData,
      field: 'invalid',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })
})
