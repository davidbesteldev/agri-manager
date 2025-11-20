import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@app/core/database/database.service'
import { Crop } from '@generated/prisma/client'
import { CropDelegate, CropFindManyArgs } from '@generated/prisma/models'

import { BaseRepository } from '@app/common/database/repositories/base.repository'
import { paginate, paginateOutput } from '@app/common/database/utils/pagination.utils'
import { QueryPaginationDto } from '@app/common/dto'

@Injectable()
export class CropRepository extends BaseRepository<CropDelegate> {
  constructor(prisma: DatabaseService) {
    super(prisma.crop)
  }

  async findManyPaginated(query?: QueryPaginationDto, args?: CropFindManyArgs) {
    const [data, total] = await Promise.all([
      this.model.findMany({
        ...args,
        ...paginate(query),
        orderBy: { createdAt: query?.order },
      }),
      this.model.count({ where: args?.where }),
    ])

    return paginateOutput<Crop>(data, total, query)
  }
}
