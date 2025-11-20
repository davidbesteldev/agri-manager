import { Transform } from 'class-transformer'
import { IsNumber, IsPositive, IsUppercase, IsUUID, Length } from 'class-validator'

import { IsStringNotBlank } from '@app/common/decorators/validators/is-string-not-blank.decorator'

export class CreateFarmDto {
  @IsUUID()
  producerId: string

  @IsStringNotBlank()
  name: string

  @IsStringNotBlank()
  city: string

  @IsStringNotBlank()
  @Length(2, 2)
  @IsUppercase()
  @Transform(({ value }: { value: string }) => value.toUpperCase())
  state: string

  @IsNumber()
  @IsPositive()
  totalArea: number

  @IsNumber()
  @IsPositive()
  arableArea: number

  @IsNumber()
  @IsPositive()
  vegetationArea: number
}
