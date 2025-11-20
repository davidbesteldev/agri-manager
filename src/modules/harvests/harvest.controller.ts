import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import {
  CreateHarvestDto,
  ListHarvestsQueryDto,
  UpdateHarvestDto,
} from '@app/modules/harvests/dto'
import { HarvestService } from '@app/modules/harvests/harvest.service'
import { HarvestEntity } from '@app/modules/harvests/repositories/entities/harvest.entity'

@Controller('harvests')
export class HarvestController {
  constructor(private readonly harvestSevice: HarvestService) {}

  @Post()
  @ApiOperation({ summary: 'Criar safra' })
  create(@Body() body: CreateHarvestDto): Promise<HarvestEntity> {
    return this.harvestSevice.create(body)
  }

  @Get()
  @ApiOperation({ summary: 'Buscar safras' })
  list(@Query() query: ListHarvestsQueryDto) {
    return this.harvestSevice.list(query)
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Atualizar safra por ID' })
  updateById(@Param('id') id: string, @Body() body: UpdateHarvestDto) {
    return this.harvestSevice.updateById(id, body)
  }
}
