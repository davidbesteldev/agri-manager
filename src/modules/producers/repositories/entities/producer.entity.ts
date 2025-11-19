import { ApiProperty } from '@nestjs/swagger'

import { DocumentType, Producer } from '@generated/prisma/client'

export class ProducerEntity implements Producer {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  document: string

  @ApiProperty({ enum: DocumentType })
  documentType: DocumentType

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
