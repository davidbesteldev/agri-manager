import { ApiProperty } from '@nestjs/swagger'

import { Farm } from '@generated/prisma/client'

export class FarmEntity implements Farm {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  city: string

  @ApiProperty({ description: 'Sigla do estado', example: 'PR' })
  state: string

  @ApiProperty()
  totalArea: number

  @ApiProperty()
  arableArea: number

  @ApiProperty()
  vegetationArea: number

  @ApiProperty()
  producerId: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
