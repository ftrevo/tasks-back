import { faker } from '@faker-js/faker'
import { ZodError } from 'zod'
import { validateOutboundObject } from './outbound'

describe('create task outbound validation', () => {
  const mockData = {
    id: faker.number.int({ min: 1 }),
    done: faker.datatype.boolean(),
    frozen: faker.datatype.boolean(),
    name: faker.lorem.words(3),
    price: faker.number.int({ min: 1, max: 2147483647 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    user: {
      name: faker.person.fullName(),
      id: faker.number.int({ min: 1 }),
    },
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

    expect(() => validateOutboundObject(invalidParams)).toThrow(ZodError)
  })

  it('should throw an error if id is less than or equal to 0', () => {
    const invalidParams = {
      ...mockData,
      id: 0,
    }

    expect(() => validateOutboundObject(invalidParams)).toThrow(ZodError)
  })

  it('should throw an error if done is not a boolean', () => {
    const invalidParams = {
      ...mockData,
      done: 'not a boolean',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if frozen is not a boolean', () => {
    const invalidParams = {
      ...mockData,
      frozen: 'not a boolean',
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })

  it('should throw an error if name is a string with less than 1 character', () => {
    const invalidParams = {
      ...mockData,
      name: '',
    }

    expect(() => validateOutboundObject(invalidParams)).toThrow(ZodError)
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

    expect(() => validateOutboundObject(invalidParams)).toThrow(ZodError)
  })

  it('should throw an error if price is not an integer', () => {
    const invalidParams = {
      ...mockData,
      price: 3.14,
    }

    expect(() => validateOutboundObject(invalidParams)).toThrow(ZodError)
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
        name: false,
      },
    }

    expect(() => validateOutboundObject(invalidParams as any)).toThrow(ZodError)
  })
})
