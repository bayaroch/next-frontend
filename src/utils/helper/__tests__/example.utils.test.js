import { formatUserName } from '../example'

describe('example', () => {
  test('formatUserName adds @ at the beginning of the username', () => {
    expect(formatUserName('jc')).toBe('@jc')
  })
})
