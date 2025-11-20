import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@app/core/database/database.service'
import { FarmCrop } from '@generated/prisma/client'
import { FarmCropDelegate, FarmCropFindManyArgs } from '@generated/prisma/models'

import { BaseRepository } from '@app/common/database/repositories/base.repository'
import { paginate, paginateOutput } from '@app/common/database/utils/pagination.utils'
import { QueryPaginationDto } from '@app/common/dto'

@Injectable()
export class FarmCropRepository extends BaseRepository<FarmCropDelegate> {
  constructor(prisma: DatabaseService) {
    super(prisma.farmCrop)
  }

  async findManyPaginated(query?: QueryPaginationDto, args?: FarmCropFindManyArgs) {
    const [data, total] = await Promise.all([
      this.model.findMany({
        ...args,
        ...paginate(query),
      }),
      this.model.count({ where: args?.where }),
    ])

    return paginateOutput<FarmCrop>(data, total, query)
  }
}
