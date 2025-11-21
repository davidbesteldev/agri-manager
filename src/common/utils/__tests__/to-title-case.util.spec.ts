import { toTitleCase } from '@app/common/utils/to-title-case.util'

describe('toTitleCase', () => {
  it('should capitalize the first letter of every word after normalization', () => {
    const input = 'olá mundo cruel'
    const expected = 'Olá Mundo Cruel'
    expect(toTitleCase(input)).toBe(expected)
  })

  it('should handle mixed casing and preserve accents (e.g., CAFÉ com LEIte)', () => {
    const input = 'cAFÉ com LEIte'
    const expected = 'Café Com Leite'

    expect(toTitleCase(input)).toBe(expected)
  })

  it('should remove extra spaces and correctly title case the resulting words', () => {
    const input = '  espaço antes e depois  '
    const expected = 'Espaço Antes E Depois'
    expect(toTitleCase(input)).toBe(expected)
  })

  it('should return the original value if input is empty or nullish', () => {
    expect(toTitleCase('')).toBe('')
  })
})
