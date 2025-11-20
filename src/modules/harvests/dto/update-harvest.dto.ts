import { PickType } from '@nestjs/swagger'

import { CreateHarvestDto } from '@app/modules/harvests/dto/create-harvest.dto'

export class UpdateHarvestDto extends PickType(CreateHarvestDto, ['name']) {}
