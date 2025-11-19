import { validate } from 'class-validator'

import { DocumentType } from '@generated/prisma/enums'

import { IsDocument } from '@app/common/decorators/validators/is-document.decorator'

class TestDto {
  documentType: DocumentType

  @IsDocument()
  document: string
}

describe('IsDocument Decorator', () => {
  it('should validate valid CPF', async () => {
    const dto = new TestDto()
    dto.documentType = DocumentType.CPF
    dto.document = '134.241.313-00'

    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should invalidate invalid CPF', async () => {
    const dto = new TestDto()
    dto.documentType = DocumentType.CPF
    dto.document = '111.444.777-00'

    let errors = await validate(dto)
    expect(errors.length).toBe(1)

    dto.documentType = DocumentType.CPF
    dto.document = '00000000000'

    errors = await validate(dto)
    expect(errors.length).toBe(1)
  })

  it('should validate valid CNPJ', async () => {
    const dto = new TestDto()
    dto.documentType = DocumentType.CNPJ
    dto.document = '04.252.011/0001-10'

    const errors = await validate(dto)
    expect(errors.length).toBe(0)
  })

  it('should invalidate invalid CNPJ', async () => {
    const dto = new TestDto()
    dto.documentType = DocumentType.CNPJ
    dto.document = '04.252.011/0001-00'

    let errors = await validate(dto)
    expect(errors.length).toBe(1)

    dto.documentType = DocumentType.CNPJ
    dto.document = '00000000000000'

    errors = await validate(dto)
    expect(errors.length).toBe(1)
  })

  it('should  clean mask when cleanMask is true (default)', async () => {
    const dto = new TestDto()
    dto.documentType = DocumentType.CPF
    dto.document = '111.444.777-35'

    await validate(dto)
    expect(dto.document).toBe('11144477735')
  })

  it('should not clean mask when cleanMask is false', async () => {
    class NoCleanDto {
      documentType: DocumentType

      @IsDocument(false)
      document: string
    }

    const dto = new NoCleanDto()
    dto.documentType = DocumentType.CPF
    dto.document = '111.444.777-35'

    await validate(dto)
    expect(dto.document).toBe('111.444.777-35')
  })

  it('should invalidate if value is not a string', async () => {
    const dto = Object.assign(new TestDto(), {
      documentType: DocumentType.CPF,
      document: 0,
    })

    const errors = await validate(dto)
    expect(errors.length).toBe(1)
  })
})
