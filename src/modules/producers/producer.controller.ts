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

import {
  CreateProducerDto,
  ListProducersQueryDto,
  UpdateProducerDto,
} from '@app/modules/producers/dto'
import { ProducerService } from '@app/modules/producers/producer.service'
import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'

@Controller('producers')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  @ApiOperation({ summary: 'Criar produtor' })
  create(@Body() body: CreateProducerDto): Promise<ProducerEntity> {
    return this.producerService.create(body)
  }

  @Get()
  @ApiOperation({ summary: 'Buscar produtores' })
  list(@Query() query: ListProducersQueryDto) {
    return this.producerService.list(query)
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Buscar produtor por ID' })
  getById(@Param('id') id: string) {
    return this.producerService.getById(id)
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Atualizar produtor por ID' })
  updateById(@Param('id') id: string, @Body() body: UpdateProducerDto) {
    return this.producerService.updateById(id, body)
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletar produtor por ID' })
  deleteById(@Param('id') id: string) {
    return this.producerService.deleteById(id)
  }
}
