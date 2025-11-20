import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@app/core/database/database.service'
import { Farm } from '@generated/prisma/client'
import { FarmDelegate, FarmFindManyArgs } from '@generated/prisma/models'

import { BaseRepository } from '@app/common/database/repositories/base.repository'
import { paginate, paginateOutput } from '@app/common/database/utils/pagination.utils'
import { QueryPaginationDto } from '@app/common/dto'

@Injectable()
export class FarmRepository extends BaseRepository<FarmDelegate> {
  constructor(prisma: DatabaseService) {
    super(prisma.farm)
  }

  async findManyPaginated(query?: QueryPaginationDto, args?: FarmFindManyArgs) {
    const [data, total] = await Promise.all([
      this.model.findMany({
        ...args,
        ...paginate(query),
        orderBy: { createdAt: query?.order },
      }),
      this.model.count({ where: args?.where }),
    ])

    return paginateOutput<Farm>(data, total, query)
  }
}
