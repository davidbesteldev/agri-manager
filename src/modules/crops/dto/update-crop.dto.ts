import { PickType } from '@nestjs/swagger'

import { CreateCropDto } from '@app/modules/crops/dto/create-crop.dto'

export class UpdateCropDto extends PickType(CreateCropDto, ['name']) {}
