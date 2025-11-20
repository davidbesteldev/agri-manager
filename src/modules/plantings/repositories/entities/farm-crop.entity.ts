import { ApiProperty } from '@nestjs/swagger'

import { FarmCrop } from '@generated/prisma/client'

export class FarmCropEntity implements FarmCrop {
  @ApiProperty()
  id: string

  @ApiProperty()
  farmId: string

  @ApiProperty()
  cropId: string

  @ApiProperty()
  harvestId: string
}
