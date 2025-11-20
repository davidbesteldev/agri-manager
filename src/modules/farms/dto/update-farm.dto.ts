import { PartialType, PickType } from '@nestjs/swagger'

import { CreateFarmDto } from '@app/modules/farms/dto/create-farm.dto'

export class UpdateFarmDto extends PartialType(
  PickType(CreateFarmDto, [
    'name',
    'city',
    'state',
    'totalArea',
    'arableArea',
    'vegetationArea',
  ]),
) {}
