import { Module } from '@nestjs/common'

import { DatabaseModule } from '@app/core/database/database.module'

import { CropModule } from '@app/modules/crops/crop.module'
import { FarmModule } from '@app/modules/farms/farm.module'
import { HarvestModule } from '@app/modules/harvests/harvest.module'
import { PlantingController } from '@app/modules/plantings/planting.controller'
import { PlantingService } from '@app/modules/plantings/planting.service'
import { FarmCropRepository } from '@app/modules/plantings/repositories/farm-crop.repository'

import * as useCases from './use-cases'

@Module({
  imports: [DatabaseModule, FarmModule, CropModule, HarvestModule],
  controllers: [PlantingController],
  providers: [FarmCropRepository, ...Object.values(useCases), PlantingService],
  exports: [FarmCropRepository],
})
export class PlantingModule {}
