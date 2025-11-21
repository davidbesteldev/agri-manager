import { UnprocessableEntityException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { CreateHarvestDto } from '@app/modules/harvests/dto'
import { HarvestEntity } from '@app/modules/harvests/repositories/entities/harvest.entity'
import { HarvestRepository } from '@app/modules/harvests/repositories/harvest.repository'
import { CreateHarvestUseCase } from '@app/modules/harvests/use-cases'

describe('CreateHarvestUseCase', () => {
  let sut: CreateHarvestUseCase

  const mockRepo = createMockDeep<HarvestRepository>()

  const dtoFaker = new EntityFaker(CreateHarvestDto)
  const entityFaker = new EntityFaker(HarvestEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        CreateHarvestUseCase,
        { provide: HarvestRepository, useValue: mockRepo },
      ],
    })

    sut = module.get<CreateHarvestUseCase>(CreateHarvestUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    mockRepo.model.create.mockResolvedValueOnce(entityFaker.fake())

    const dto = dtoFaker.fake()
    const result = await sut.execute(dto)

    expect(result).toBeDefined()
    expect(mockRepo.model.findFirst).toHaveBeenCalledWith({
      where: { name: { equals: dto.name, mode: 'insensitive' } },
    })
    expect(mockRepo.model.create).toHaveBeenCalledWith({ data: dto })
  })

  it('should throw UnprocessableEntityException if harvest name already exist', async () => {
    mockRepo.model.findFirst.mockResolvedValueOnce(entityFaker.fake())

    const dto = dtoFaker.fake()
    await expect(sut.execute(dto)).rejects.toThrow(UnprocessableEntityException)

    expect(mockRepo.model.findFirst).toHaveBeenCalledWith({
      where: { name: { equals: dto.name, mode: 'insensitive' } },
    })
    expect(mockRepo.model.create).not.toHaveBeenCalled()
  })
})
