import { faker } from '@faker-js/faker'
import { ZodError } from 'zod'
import { validateOutboundObject } from './outbound'

describe('create subtask outbound validation', () => {
  const mockData = {
    id: faker.number.int({ min: 1 }),
    name: faker.lorem.words(3),
    price: faker.number.int({ min: 1, max: 2147483647 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    user: {
      name: faker.person.fullName(),
      id: faker.number.int({ min: 1 }),
    },
    taskId: faker.number.int({ min: 1 }),
  }

  it('should pass and return a sanitized object', () => {
    const output = validateOutboundObject({ ...mockData, should: 'be removed' } as any)

    expect(output).toEqual(mockData)
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

  it('should throw an error if name is a string with less than 1 character', () => {
    const invalidParams = {
      ...mockData,
      name: '',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if name is not a string', () => {
    const invalidParams = {
      ...mockData,
      name: 123,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if price is not a number', () => {
    const invalidParams = {
      ...mockData,
      price: 'not a number',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if price is a negative number', () => {
    const invalidParams = {
      ...mockData,
      price: -1,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if price is not an integer', () => {
    const invalidParams = {
      ...mockData,
      price: 3.14,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should pass if price is not provided', () => {
    const validParams = {
      ...mockData,
      price: undefined,
    }

    const output = validateOutboundObject(validParams)

    expect(output).toEqual(validParams)
  })

  it('should throw an error if createdAt is not a date', () => {
    const invalidParams = {
      ...mockData,
      createdAt: 'not a date',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if updatedAt is not a date', () => {
    const invalidParams = {
      ...mockData,
      updatedAt: 'not a date',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if user.name is a string with less than 1 character', () => {
    const invalidParams = {
      ...mockData,
      user: {
        name: '',
      },
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if user.name is not a string', () => {
    const invalidParams = {
      ...mockData,
      user: {
        name: 123,
      },
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if taskId is not a number', () => {
    const invalidParams = {
      ...mockData,
      taskId: 'not a number',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if taskId is not an integer', () => {
    const invalidParams = {
      ...mockData,
      taskId: 3.14,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if taskId is less than 0', () => {
    const invalidParams = {
      ...mockData,
      taskId: -1,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if user is not an object', () => {
    const invalidParams = {
      ...mockData,
      user: 'not an object',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if user is not provided', () => {
    const invalidParams = {
      ...mockData,
      user: undefined,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if id is not provided', () => {
    const invalidParams = {
      ...mockData,
      id: undefined,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if name is not provided', () => {
    const invalidParams = {
      ...mockData,
      name: undefined,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if createdAt is not provided', () => {
    const invalidParams = {
      ...mockData,
      createdAt: undefined,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if updatedAt is not provided', () => {
    const invalidParams = {
      ...mockData,
      updatedAt: undefined,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if taskId is not provided', () => {
    const invalidParams = {
      ...mockData,
      taskId: undefined,
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })
})
