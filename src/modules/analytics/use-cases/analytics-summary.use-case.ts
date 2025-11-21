import { Injectable } from '@nestjs/common'

import { FarmWhereInput } from '@generated/prisma/models'

import {
  AnalyticsSummaryQueryDto,
  AnalyticsSummaryResponseDto,
} from '@app/modules/analytics/dto'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'

@Injectable()
export class AnalyticsSummaryUseCase {
  constructor(private readonly farmRepo: FarmRepository) {}

  async execute(query: AnalyticsSummaryQueryDto): Promise<AnalyticsSummaryResponseDto> {
    const where: FarmWhereInput = query?.producerId
      ? { producerId: query?.producerId }
      : {}

    const [totalFarms, areaAggregation] = await Promise.all([
      this.farmRepo.model.count({ where }),
      this.farmRepo.model.aggregate({
        where,
        _sum: {
          totalArea: true,
          arableArea: true,
          vegetationArea: true,
        },
      }),
    ])

    return {
      totalFarms: totalFarms,
      totalHectares: areaAggregation._sum.totalArea || 0,
      totalArable: areaAggregation._sum.arableArea || 0,
      totalVegetation: areaAggregation._sum.vegetationArea || 0,
    }
  }
}
