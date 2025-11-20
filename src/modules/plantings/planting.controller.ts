import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { CreatePlantingDto, ListPlantingsQueryDto } from '@app/modules/plantings/dto'
import { PlantingService } from '@app/modules/plantings/planting.service'
import { FarmCropEntity } from '@app/modules/plantings/repositories/entities/farm-crop.entity'

@Controller('plantings')
export class PlantingController {
  constructor(private readonly plantingService: PlantingService) {}

  @Post()
  @ApiOperation({ summary: 'Criar plantação' })
  create(@Body() body: CreatePlantingDto): Promise<FarmCropEntity> {
    return this.plantingService.create(body)
  }

  @Get()
  @ApiOperation({ summary: 'Buscar plantações' })
  list(@Query() query: ListPlantingsQueryDto) {
    return this.plantingService.list(query)
  }
}
