import { IsOptional, IsUUID } from 'class-validator'

export class AnalyticsGetFarmGroupedMetricsQueryDto {
  @IsUUID()
  @IsOptional()
  producerId?: string
}

export class AnalyticsGetFarmGroupedMetricsResponseDto {
  state: string
  totalHectaresSum: number
  totalFarms: number
}
