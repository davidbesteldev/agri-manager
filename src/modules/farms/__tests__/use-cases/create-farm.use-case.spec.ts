import { UnprocessableEntityException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { CreateFarmDto } from '@app/modules/farms/dto'
import { FarmCheckAreaHelper } from '@app/modules/farms/helpers'
import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'
import { CreateFarmUseCase } from '@app/modules/farms/use-cases'
import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'

describe('CreateFarmUseCase', () => {
  let sut: CreateFarmUseCase

  const mockFarmRepo = createMockDeep<FarmRepository>()
  const mockProducerRepo = createMockDeep<ProducerRepository>()
  const mockFarmCheckAreaHelper = createMockDeep<FarmCheckAreaHelper>()

  const dtoFaker = new EntityFaker(CreateFarmDto)
  const farmEntityFaker = new EntityFaker(FarmEntity)
  const producerEntityFaker = new EntityFaker(ProducerEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        CreateFarmUseCase,
        { provide: ProducerRepository, useValue: mockProducerRepo },
        { provide: FarmRepository, useValue: mockFarmRepo },
        { provide: FarmCheckAreaHelper, useValue: mockFarmCheckAreaHelper },
      ],
    })

    sut = module.get<CreateFarmUseCase>(CreateFarmUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    mockProducerRepo.model.findFirst.mockResolvedValueOnce(producerEntityFaker.fake())
    mockFarmRepo.model.create.mockResolvedValueOnce(farmEntityFaker.fake())

    const dto = dtoFaker.fake()
    const result = await sut.execute(dto)

    expect(result).toBeDefined()
    expect(mockProducerRepo.model.findFirst).toHaveBeenCalledWith({
      where: { id: dto.producerId },
    })
    expect(mockFarmCheckAreaHelper.execute).toHaveBeenCalledWith(dto)
    expect(mockFarmRepo.model.create).toHaveBeenCalledWith({ data: dto })
  })

  it('should throw UnprocessableEntityException if producer not found', async () => {
    mockProducerRepo.model.findFirst.mockResolvedValueOnce(null)

    const dto = dtoFaker.fake()
    await expect(sut.execute(dto)).rejects.toThrow(UnprocessableEntityException)

    expect(mockProducerRepo.model.findFirst).toHaveBeenCalledWith({
      where: { id: dto.producerId },
    })
    expect(mockFarmCheckAreaHelper.execute).not.toHaveBeenCalled()
    expect(mockFarmRepo.model.create).not.toHaveBeenCalled()
  })
})
