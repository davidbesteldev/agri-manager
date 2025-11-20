import { ApiProperty } from '@nestjs/swagger'

import { Crop } from '@generated/prisma/client'

export class CropEntity implements Crop {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
