import { removeAccents } from '@app/common/utils/remove-accents.util'

describe('removeAccents', () => {
  it('should remove tilde (~) and acute (´) accents correctly', () => {
    const input = 'Comunicação, Café, Opinião, Lápis'
    const expected = 'Comunicacao, Cafe, Opiniao, Lapis'
    expect(removeAccents(input)).toBe(expected)
  })

  it('should remove cedilla (ç) and circumflex (^) accents correctly', () => {
    const input = 'Receção, Você, Três, Vôo'
    const expected = 'Rececao, Voce, Tres, Voo'
    expect(removeAccents(input)).toBe(expected)
  })

  it('should handle uppercase letters with accents', () => {
    const input = 'REGIÃO SUL, MÃE TERRA, CÂNCER'
    const expected = 'REGIAO SUL, MAE TERRA, CANCER'
    expect(removeAccents(input)).toBe(expected)
  })

  it('should not change strings that do not contain accents', () => {
    const input = 'colombo, sao, paulo, farm area 123'
    expect(removeAccents(input)).toBe(input)
  })

  it('should return an empty string when given an empty string', () => {
    expect(removeAccents('')).toBe('')
  })

  it('should handle mixed characters and complex accents (umlaut)', () => {
    const input = 'São João da Prússia - Ünternehmen'
    const expected = 'Sao Joao da Prussia - Unternehmen'
    expect(removeAccents(input)).toBe(expected)
  })
})
