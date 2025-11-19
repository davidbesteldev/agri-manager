import { PickType } from '@nestjs/swagger'

import { CreateProducerDto } from '@app/modules/producers/dto/create-producer.dto'

export class UpdateProducerDto extends PickType(CreateProducerDto, ['name']) {}
