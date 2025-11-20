import { Module } from '@nestjs/common'

import { DatabaseModule } from '@app/core/database/database.module'

import { CropController } from '@app/modules/crops/crop.controller'
import { CropService } from '@app/modules/crops/crop.service'
import { CropRepository } from '@app/modules/crops/repositories/crop.repository'

import * as useCases from './use-cases'

@Module({
  imports: [DatabaseModule],
  controllers: [CropController],
  providers: [CropRepository, ...Object.values(useCases), CropService],
  exports: [CropRepository],
})
export class CropModule {}
