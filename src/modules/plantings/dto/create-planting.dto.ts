import { IsUUID } from 'class-validator'

export class CreatePlantingDto {
  @IsUUID()
  farmId: string

  @IsUUID()
  cropId: string

  @IsUUID()
  harvestId: string
}
