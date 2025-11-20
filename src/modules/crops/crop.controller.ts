import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { CropService } from '@app/modules/crops/crop.service'
import { CreateCropDto } from '@app/modules/crops/dto'
import { ListCropsQueryDto } from '@app/modules/crops/dto/list-crops.dto'
import { UpdateCropDto } from '@app/modules/crops/dto/update-crop.dto'
import { CropEntity } from '@app/modules/crops/repositories/entities/crop.entity'

@Controller('crops')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Post()
  @ApiOperation({ summary: 'Criar cultura' })
  create(@Body() body: CreateCropDto): Promise<CropEntity> {
    return this.cropService.create(body)
  }

  @Get()
  @ApiOperation({ summary: 'Buscar culturas' })
  list(@Query() query: ListCropsQueryDto) {
    return this.cropService.list(query)
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Atualizar cultura por ID' })
  updateById(@Param('id') id: string, @Body() body: UpdateCropDto) {
    return this.cropService.updateById(id, body)
  }
}
