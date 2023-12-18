import { ZodError } from 'zod'
import { validateInboundParams } from './inbound'

describe('join room inbound validation', () => {
  it('should pass and return a sanitized string', () => {
    const validRoom = 'tasks/123'
    const output = validateInboundParams(validRoom)

    expect(output).toEqual(validRoom)
  })

  it('should pass if room is just "tasks"', () => {
    const validRoom = 'tasks'
    const output = validateInboundParams(validRoom)

    expect(output).toEqual(validRoom)
  })

  it('should throw an error if room does not start with "tasks"', () => {
    const invalidRoom = 'notTasks/123'

    expect(() => validateInboundParams(invalidRoom)).toThrow(ZodError)
  })

  it('should throw an error if room has more than one slash', () => {
    const invalidRoom = 'tasks/123/456'

    expect(() => validateInboundParams(invalidRoom)).toThrow(ZodError)
  })

  it('should throw an error if room has a non-integer after the slash', () => {
    const invalidRoom = 'tasks/abc'

    expect(() => validateInboundParams(invalidRoom)).toThrow(ZodError)
  })

  it('should throw an error if room has a negative integer after the slash', () => {
    const invalidRoom = 'tasks/-123'

    expect(() => validateInboundParams(invalidRoom)).toThrow(ZodError)
  })

  it('should throw an error if room is not a string', () => {
    const invalidRoom = 123

    expect(() => validateInboundParams(invalidRoom as any)).toThrow(ZodError)
  })
})
