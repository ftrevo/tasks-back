import { ZodError } from 'zod'
import { validateOutboundObject } from './outbound'
import { faker } from '@faker-js/faker'

describe('list tasks outbound validation', () => {
  const mockData = {
    id: faker.number.int({ min: 1 }),
    name: faker.lorem.word(),
    price: faker.number.int({ min: 1, max: 2147483647 }),
    updatedAt: faker.date.anytime(),
    user: {
      name: faker.person.fullName(),
    },
    done: faker.datatype.boolean(),
    frozen: faker.datatype.boolean(),
    subTasksPrice: faker.number.int({ min: 1 }),
  }

  it('should pass and return a sanitized object', () => {
    const output = validateOutboundObject({ x: { ...mockData, should: 'be removed' } } as any)

    expect(output).toEqual({ x: mockData })
  })

  it('should pass if price is not present', () => {
    const validParams = {
      ...mockData,
      price: undefined,
    }

    expect(() => validateOutboundObject({ x: validParams })).not.toThrow(ZodError)
  })

  it('should pass if subTasksPrice is not present', () => {
    const { subTasksPrice, ...validParams } = mockData

    expect(() => validateOutboundObject({ x: validParams })).not.toThrow(ZodError)
  })

  it('should throw an error if id is not a number', () => {
    const invalidParams = {
      ...mockData,
      id: 'invalid',
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if id is less than or equal to 0', () => {
    const invalidParams = {
      ...mockData,
      id: 0,
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if name is not a string', () => {
    const invalidParams = {
      ...mockData,
      name: 123,
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if name is an empty string', () => {
    const invalidParams = {
      ...mockData,
      name: '',
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if price is not a number', () => {
    const invalidParams = {
      ...mockData,
      price: 'invalid',
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if price is less than 0', () => {
    const invalidParams = {
      ...mockData,
      price: -1,
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if updatedAt is not a date', () => {
    const invalidParams = {
      ...mockData,
      updatedAt: 'invalid',
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if user is not an object', () => {
    const invalidParams = {
      ...mockData,
      user: 'invalid',
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if user.name is not a string', () => {
    const invalidParams = {
      ...mockData,
      user: {
        name: 123,
      },
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if user.name is an empty string', () => {
    const invalidParams = {
      ...mockData,
      user: {
        name: '',
      },
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if done is not a boolean', () => {
    const invalidParams = {
      ...mockData,
      done: 'invalid',
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if frozen is not a boolean', () => {
    const invalidParams = {
      ...mockData,
      frozen: 'invalid',
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if subTasksPrice is not a number', () => {
    const invalidParams = {
      ...mockData,
      subTasksPrice: 'invalid',
    }

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if id is not present', () => {
    const { id, ...invalidParams } = mockData

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if name is not present', () => {
    const { name, ...invalidParams } = mockData

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if updatedAt is not present', () => {
    const { updatedAt, ...invalidParams } = mockData

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })

  it('should throw an error if user is not present', () => {
    const { user, ...invalidParams } = mockData

    expect(() => validateOutboundObject({ x: invalidParams } as any)).toThrow(ZodError)
  })
})
