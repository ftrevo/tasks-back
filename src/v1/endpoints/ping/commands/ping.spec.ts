import { pingCommand } from './ping'

describe('ping command', () => {
  it('should return status ok', () => {
    const output = pingCommand()

    expect(output).toEqual({
      status: 'ok',
    })
  })
})
