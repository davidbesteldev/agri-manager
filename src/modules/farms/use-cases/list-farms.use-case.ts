import { Injectable } from '@nestjs/common'

import { FarmFindManyArgs } from '@generated/prisma/models'

import { ListFarmsQueryDto, ListFarmsResponseDto } from '@app/modules/farms/dto'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'

@Injectable()
export class ListFarmsUseCase {
  constructor(private readonly farmRepo: FarmRepository) {}

  execute(query?: ListFarmsQueryDto): Promise<ListFarmsResponseDto> {
    const where: FarmFindManyArgs['where'] = { producerId: query?.producerId }

    return this.farmRepo.findManyPaginated(query, { where })
  }
}
