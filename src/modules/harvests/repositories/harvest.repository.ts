import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@app/core/database/database.service'
import { Harvest } from '@generated/prisma/client'
import { HarvestDelegate, HarvestFindManyArgs } from '@generated/prisma/models'

import { BaseRepository } from '@app/common/database/repositories/base.repository'
import { paginate, paginateOutput } from '@app/common/database/utils/pagination.utils'
import { QueryPaginationDto } from '@app/common/dto'

@Injectable()
export class HarvestRepository extends BaseRepository<HarvestDelegate> {
  constructor(prisma: DatabaseService) {
    super(prisma.harvest)
  }

  async findManyPaginated(query?: QueryPaginationDto, args?: HarvestFindManyArgs) {
    const [data, total] = await Promise.all([
      this.model.findMany({
        ...args,
        ...paginate(query),
        orderBy: { createdAt: query?.order },
      }),
      this.model.count({ where: args?.where }),
    ])

    return paginateOutput<Harvest>(data, total, query)
  }
}
