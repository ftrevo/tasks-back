import { faker } from '@faker-js/faker'
import { ZodError } from 'zod'
import { validateInboundParams } from './inbound'

describe('list tasks inbound validation', () => {
  const mockData = { text: faker.lorem.word() }

  it('should pass and return a sanitized object', () => {
    const output = validateInboundParams(mockData)

    expect(output).toEqual(mockData)
  })

  it('should throw an error if text is not a string', () => {
    expect(() => validateInboundParams({ text: false } as any)).toThrow(ZodError)
  })
})
