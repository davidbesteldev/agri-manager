import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { CreateFarmDto, ListFarmsQueryDto, UpdateFarmDto } from '@app/modules/farms/dto'
import { FarmService } from '@app/modules/farms/farm.service'
import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'

@Controller('farms')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  @ApiOperation({ summary: 'Criar fazenda' })
  create(@Body() body: CreateFarmDto): Promise<FarmEntity> {
    return this.farmService.create(body)
  }

  @Get()
  @ApiOperation({ summary: 'Buscar fazendas' })
  list(@Query() query: ListFarmsQueryDto) {
    return this.farmService.list(query)
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Buscar fazenda por ID' })
  getById(@Param('id') id: string) {
    return this.farmService.getById(id)
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Atualizar fazenda por ID' })
  updateById(@Param('id') id: string, @Body() body: UpdateFarmDto) {
    return this.farmService.updateById(id, body)
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletar fazenda por ID' })
  deleteById(@Param('id') id: string) {
    return this.farmService.deleteById(id)
  }
}
