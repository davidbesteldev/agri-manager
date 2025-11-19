import { IsEnum } from 'class-validator'

import { DocumentType } from '@generated/prisma/enums'

import { IsDocument } from '@app/common/decorators/validators/is-document.decorator'
import { IsStringNotBlank } from '@app/common/decorators/validators/is-string-not-blank.decorator'

export class CreateProducerDto {
  @IsStringNotBlank()
  name: string

  @IsDocument()
  document: string

  @IsEnum(DocumentType)
  documentType: DocumentType
}
