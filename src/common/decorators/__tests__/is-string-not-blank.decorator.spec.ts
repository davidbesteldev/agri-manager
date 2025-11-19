import { validate } from 'class-validator'

import { IsStringNotBlank } from '@app/common/decorators/validators/is-string-not-blank.decorator'

class TestDto {
  @IsStringNotBlank()
  prop: string
}

describe('IsStringNotBlank Decorator', () => {
  it('should validate non-blank string as valid', async () => {
    const dto = new TestDto()
    dto.prop = 'valid string'

    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should invalidate blank string', async () => {
    const dto = new TestDto()
    dto.prop = '    '

    const errors = await validate(dto)
    expect(errors.length).toBe(1)
    expect(errors[0].constraints).toHaveProperty('IsStringNotBlank')
  })

  it('should invalidate non-string values', async () => {
    const dto = Object.assign(new TestDto(), {
      document: 0,
    })

    const errors = await validate(dto)
    expect(errors.length).toBe(1)
  })
})
