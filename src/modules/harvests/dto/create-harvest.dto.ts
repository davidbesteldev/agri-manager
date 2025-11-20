import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { Matches } from 'class-validator'

import { IsStringNotBlank } from '@app/common/decorators/validators/is-string-not-blank.decorator'
import { toTitleCase } from '@app/common/utils'

const HARVEST_NAME_REGEX = /^\d{4}(\/\d{4})?$/

export class CreateHarvestDto {
  @ApiProperty({
    description:
      'The harvest name (e.g., 2024 or 2024/2025). Must follow the YYYY or YYYY/YYYY format.',
    example: '2025',
  })
  @IsStringNotBlank()
  @Transform(({ value }: { value: string }) => toTitleCase(value))
  @Matches(HARVEST_NAME_REGEX, {
    message: 'The harvest name must follow the format YYYY or YYYY/YYYY.',
  })
  name: string
}
