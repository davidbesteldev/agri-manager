import { Module } from '@nestjs/common'

import { EnvModule } from '@app/core/config'
import { DatabaseModule } from '@app/core/database/database.module'

import { CropModule } from '@app/modules/crops/crop.module'
import { FarmModule } from '@app/modules/farms/farm.module'
import { ProducerModule } from '@app/modules/producers/producer.module'

@Module({
  imports: [EnvModule, DatabaseModule, ProducerModule, FarmModule, CropModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
