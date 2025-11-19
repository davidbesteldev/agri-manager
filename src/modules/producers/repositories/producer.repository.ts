import { paginate, paginateOutput } from '@app/common/database/utils/pagination.utils'
import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@app/core/database/database.service'
import { Producer } from '@generated/prisma/client'
import { ProducerDelegate, ProducerFindManyArgs } from '@generated/prisma/models'

import { BaseRepository } from '@app/common/database/repositories/base.repository'
import { QueryPaginationDto } from '@app/common/dto'

@Injectable()
export class ProducerRepository extends BaseRepository<ProducerDelegate> {
  constructor(prisma: DatabaseService) {
    super(prisma.producer)
  }

  async findManyPaginated(query?: QueryPaginationDto, args?: ProducerFindManyArgs) {
    const [data, total] = await Promise.all([
      this.model.findMany({
        ...args,
        ...paginate(query),
        orderBy: { createdAt: query?.order },
      }),
      this.model.count({ where: args?.where }),
    ])

    return paginateOutput<Producer>(data, total, query)
  }
}
