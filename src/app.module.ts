import { Module } from '@nestjs/common'

import { EnvModule } from '@app/core/config'
import { DatabaseModule } from '@app/core/database/database.module'

import { AnalyticsModule } from '@app/modules/analytics/analytics.module'
import { CropModule } from '@app/modules/crops/crop.module'
import { FarmModule } from '@app/modules/farms/farm.module'
import { HarvestModule } from '@app/modules/harvests/harvest.module'
import { PlantingModule } from '@app/modules/plantings/planting.module'
import { ProducerModule } from '@app/modules/producers/producer.module'

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    ProducerModule,
    FarmModule,
    CropModule,
    HarvestModule,
    PlantingModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
