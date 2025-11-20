import { Transform } from 'class-transformer'

import { IsStringNotBlank } from '@app/common/decorators/validators/is-string-not-blank.decorator'
import { toTitleCase } from '@app/common/utils'

export class CreateCropDto {
  @IsStringNotBlank()
  @Transform(({ value }: { value: string }) => toTitleCase(value))
  name: string
}
