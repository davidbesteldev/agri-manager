import { IsOptional, IsUUID } from 'class-validator'

export class AnalyticsSummaryQueryDto {
  @IsUUID()
  @IsOptional()
  producerId?: string
}

export class AnalyticsSummaryResponseDto {
  totalFarms: number
  totalHectares: number
  totalArable: number
  totalVegetation: number
}
