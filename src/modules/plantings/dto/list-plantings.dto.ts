import { IsOptional, IsUUID } from 'class-validator'

import { PaginationMetaDto, QueryPaginationDto } from '@app/common/dto'

import { CropEntity } from '@app/modules/crops/repositories/entities/crop.entity'
import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import { HarvestEntity } from '@app/modules/harvests/repositories/entities/harvest.entity'

export class ListPlantingsQueryDto extends QueryPaginationDto {
  @IsUUID()
  @IsOptional()
  producerId?: string

  @IsUUID()
  @IsOptional()
  farmId?: string

  @IsUUID()
  @IsOptional()
  cropId?: string

  @IsUUID()
  @IsOptional()
  harvestId?: string
}

export class ListPlantingsResponseDto {
  data: { id: string; farm: FarmEntity; crop: CropEntity; harvest: HarvestEntity }[]
  meta: PaginationMetaDto
}
