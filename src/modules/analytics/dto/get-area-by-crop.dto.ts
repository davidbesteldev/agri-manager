import { IsOptional, IsUUID } from 'class-validator'

export class AnalyticsGetAreaByCropQueryDto {
  @IsUUID()
  @IsOptional()
  producerId?: string

  @IsUUID()
  @IsOptional()
  harvestId?: string
}

export class AnalyticsGetAreaByCropResponseDto {
  cropName: string
  cropId: string
  plantingCount: number
  totalArableAreaSum: number
}
