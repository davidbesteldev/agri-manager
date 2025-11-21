import { Injectable } from '@nestjs/common'

import {
  AnalyticsGetAreaByCropQueryDto,
  AnalyticsGetAreaByCropResponseDto,
  AnalyticsGetFarmGroupedMetricsQueryDto,
  AnalyticsGetFarmGroupedMetricsResponseDto,
  AnalyticsSummaryQueryDto,
  AnalyticsSummaryResponseDto,
} from '@app/modules/analytics/dto'
import {
  AnalyticsGetAreaByCropUseCase,
  AnalyticsGetFarmGroupedMetricsUseCase,
  AnalyticsSummaryUseCase,
} from '@app/modules/analytics/use-cases'

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly analyticsSummaryUseCase: AnalyticsSummaryUseCase,
    private readonly analyticsGetFarmGroupedMetricsUseCase: AnalyticsGetFarmGroupedMetricsUseCase,
    private readonly analyticsGetAreaByCropUseCase: AnalyticsGetAreaByCropUseCase,
  ) {}

  getSummary(query: AnalyticsSummaryQueryDto): Promise<AnalyticsSummaryResponseDto> {
    return this.analyticsSummaryUseCase.execute(query)
  }

  getGroupedMetrics(
    query: AnalyticsGetFarmGroupedMetricsQueryDto,
  ): Promise<AnalyticsGetFarmGroupedMetricsResponseDto[]> {
    return this.analyticsGetFarmGroupedMetricsUseCase.execute(query)
  }

  getAreaByCrop(
    query: AnalyticsGetAreaByCropQueryDto,
  ): Promise<AnalyticsGetAreaByCropResponseDto[]> {
    return this.analyticsGetAreaByCropUseCase.execute(query)
  }
}
