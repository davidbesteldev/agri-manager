import { Injectable, UnprocessableEntityException } from '@nestjs/common'

import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'

@Injectable()
export class FarmCheckAreaHelper {
  execute(areaValues: Pick<FarmEntity, 'arableArea' | 'totalArea' | 'vegetationArea'>) {
    if (areaValues.arableArea + areaValues.vegetationArea > areaValues.totalArea) {
      throw new UnprocessableEntityException(
        'The sum of the areas cannot exceed the farms total area.',
      )
    }
  }
}
