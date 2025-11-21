import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { AnalyticsService } from '@app/modules/analytics/analytics.service'
import {
  AnalyticsGetAreaByCropQueryDto,
  AnalyticsGetFarmGroupedMetricsQueryDto,
  AnalyticsSummaryQueryDto,
} from '@app/modules/analytics/dto'

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('/summary')
  @ApiOperation({ summary: 'Sumário', description: 'Retorna os totais gerais' })
  summary(@Query() query: AnalyticsSummaryQueryDto) {
    return this.analyticsService.getSummary(query)
  }

  @Get('/grouped-metrics')
  @ApiOperation({
    summary: 'Métricas agrupadas',
    description: 'Retorna métricas agrupadas por estado',
  })
  groupedMetrics(@Query() query: AnalyticsGetFarmGroupedMetricsQueryDto) {
    return this.analyticsService.getGroupedMetrics(query)
  }

  @Get('/area-by-crop')
  @ApiOperation({
    summary: 'Area por cultura',
    description: 'Retorna um agrupamento de area por cultura',
  })
  areaByCrop(@Query() query: AnalyticsGetAreaByCropQueryDto) {
    return this.analyticsService.getAreaByCrop(query)
  }
}
