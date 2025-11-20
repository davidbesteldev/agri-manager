import { ApiProperty } from '@nestjs/swagger'

import { Harvest } from '@generated/prisma/client'

export class HarvestEntity implements Harvest {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
