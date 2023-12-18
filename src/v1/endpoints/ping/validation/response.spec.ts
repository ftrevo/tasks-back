import { ZodError } from 'zod'
import { validateResponseObject } from './response'

describe('ping response validation', () => {
  it('should pass and return a sanitized object', () => {
    const output = validateResponseObject({
      status: 'ok',
      should: 'be removed',
    } as any)

    expect(output).toEqual({
      status: 'ok',
    })
  })

  it('should fail due to different status', () => {
    const invalidData = {
      status: 'not ok',
    }

    expect(() => validateResponseObject(invalidData as any)).toThrow(ZodError)
  })
})
