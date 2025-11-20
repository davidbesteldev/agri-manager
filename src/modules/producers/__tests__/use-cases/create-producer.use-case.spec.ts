import { UnprocessableEntityException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { CreateProducerDto } from '@app/modules/producers/dto'
import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'
import { CreateProducerUseCase } from '@app/modules/producers/use-cases'

describe('CreateProducerUseCase', () => {
  let sut: CreateProducerUseCase

  const mockProducerRepo = createMockDeep<ProducerRepository>()

  const dtoFaker = new EntityFaker(CreateProducerDto)
  const entityFaker = new EntityFaker(ProducerEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        CreateProducerUseCase,
        { provide: ProducerRepository, useValue: mockProducerRepo },
      ],
    })

    sut = module.get<CreateProducerUseCase>(CreateProducerUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    mockProducerRepo.model.create.mockResolvedValueOnce(entityFaker.fake())

    const dto = dtoFaker.fake()
    const result = await sut.execute(dto)

    expect(result).toBeDefined()
    expect(mockProducerRepo.model.findFirst).toHaveBeenCalledWith({
      where: { document: dto.document },
    })
    expect(mockProducerRepo.model.create).toHaveBeenCalledWith({ data: dto })
  })

  it('should throw UnprocessableEntityException if producer already exists', async () => {
    mockProducerRepo.model.findFirst.mockResolvedValueOnce(entityFaker.fake())

    const dto = dtoFaker.fake()
    await expect(sut.execute(dto)).rejects.toThrow(UnprocessableEntityException)

    expect(mockProducerRepo.model.findFirst).toHaveBeenCalledWith({
      where: { document: dto.document },
    })
    expect(mockProducerRepo.model.create).not.toHaveBeenCalled()
  })
})
