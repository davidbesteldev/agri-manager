import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@app/core/database/database.service'
import { Prisma } from '@generated/prisma/client'

import {
  AnalyticsGetAreaByCropQueryDto,
  AnalyticsGetAreaByCropResponseDto,
} from '@app/modules/analytics/dto'

@Injectable()
export class AnalyticsGetAreaByCropUseCase {
  constructor(private readonly databaseService: DatabaseService) {}

  async execute(
    query: AnalyticsGetAreaByCropQueryDto,
  ): Promise<AnalyticsGetAreaByCropResponseDto[]> {
    const whereClauses = ['TRUE']

    if (query?.producerId) {
      whereClauses.push(`T3."producer_id" = '${query.producerId}'`)
    }

    if (query?.harvestId) {
      whereClauses.push(`T1."harvest_id" = '${query.harvestId}'`)
    }

    const whereCondition = whereClauses.join(' AND ')

    const results = await this.databaseService.$queryRaw`
      SELECT
          T2.name AS "cropName",
          T2.id AS "cropId",
          COUNT(T1.id)::int AS "plantingCount",
          SUM(T3."arable_area")::double precision AS "totalArableAreaSum"
      FROM "farm_crops" AS T1
      JOIN "crops" AS T2 ON T1."crop_id" = T2.id
      JOIN "farms" AS T3 ON T1."farm_id" = T3.id
      WHERE ${Prisma.raw(whereCondition)}
      GROUP BY T2.id, T2.name
      ORDER BY "totalArableAreaSum" DESC
    `

    return results as AnalyticsGetAreaByCropResponseDto[]
  }
}
