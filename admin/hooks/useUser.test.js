const Cookies = require('js-cookie')
const {renderHook} = require('@testing-library/react')
const {useUser} = require('./useUser')

describe('useUser', () => {
    beforeEach(() => {
        Cookies.remove('username')
    })

  test('should return \'testUsername\' when the username cookie is set', () => {
    const expected = 'testUsername'
    Cookies.set('username', 'testUsername')
    const { result } = renderHook(() => useUser())
    expect(result.current[0]).toEqual(expected)
  })

  test('should return undefined when the username cookie is not set', () => {
    const expected = undefined
    const { result } = renderHook(() => useUser())
    expect(result.current[0]).toEqual(expected)
  })
})