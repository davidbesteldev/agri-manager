import { Module } from '@nestjs/common'

import { DatabaseModule } from '@app/core/database/database.module'

import { AnalyticsController } from '@app/modules/analytics/analytics.controller'
import { AnalyticsService } from '@app/modules/analytics/analytics.service'
import { FarmModule } from '@app/modules/farms/farm.module'

import * as useCases from './use-cases'

@Module({
  imports: [DatabaseModule, FarmModule],
  controllers: [AnalyticsController],
  providers: [...Object.values(useCases), AnalyticsService],
  exports: [],
})
export class AnalyticsModule {}
