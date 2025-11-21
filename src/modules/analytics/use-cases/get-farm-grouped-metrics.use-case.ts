import { Injectable } from '@nestjs/common'

import { FarmWhereInput } from '@generated/prisma/models'

import {
  AnalyticsGetFarmGroupedMetricsQueryDto,
  AnalyticsGetFarmGroupedMetricsResponseDto,
} from '@app/modules/analytics/dto'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'

@Injectable()
export class AnalyticsGetFarmGroupedMetricsUseCase {
  constructor(private readonly farmRepo: FarmRepository) {}

  async execute(
    query: AnalyticsGetFarmGroupedMetricsQueryDto,
  ): Promise<AnalyticsGetFarmGroupedMetricsResponseDto[]> {
    const where: FarmWhereInput = query?.producerId
      ? { producerId: query.producerId }
      : {}

    const results = await this.farmRepo.model.groupBy({
      by: ['state'],
      where,
      _sum: { totalArea: true },
      _count: { id: true },
      orderBy: {
        _sum: { totalArea: 'desc' },
      },
    })

    return results.map((item) => ({
      state: item.state,
      totalFarms: item._count.id,
      totalHectaresSum: item._sum.totalArea || 0,
    }))
  }
}
