import { faker } from '@faker-js/faker'
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { HarvestEntity } from '@app/modules/harvests/repositories/entities/harvest.entity'
import { HarvestRepository } from '@app/modules/harvests/repositories/harvest.repository'
import { UpdateHarvestUseCase } from '@app/modules/harvests/use-cases'

describe('UpdateHarvestUseCase', () => {
  let sut: UpdateHarvestUseCase

  const mockRepo = createMockDeep<HarvestRepository>()
  const entityFaker = new EntityFaker(HarvestEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        UpdateHarvestUseCase,
        { provide: HarvestRepository, useValue: mockRepo },
      ],
    })

    sut = module.get<UpdateHarvestUseCase>(UpdateHarvestUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    const entityFake = entityFaker.fake()
    mockRepo.model.findUnique.mockResolvedValueOnce(entityFake)
    mockRepo.model.update.mockResolvedValueOnce(entityFake)

    const harvestId = faker.string.uuid()
    const dto = { name: '2025' }
    const result = await sut.execute(harvestId, dto)

    expect(result).toBeDefined()
    expect(mockRepo.model.findUnique).toHaveBeenCalledWith({ where: { id: harvestId } })
    expect(mockRepo.model.findFirst).toHaveBeenCalledWith({
      where: { name: { equals: dto.name, mode: 'insensitive' } },
    })
    expect(mockRepo.model.update).toHaveBeenCalledWith({
      where: { id: harvestId },
      data: dto,
    })
  })

  it('should throw NotFoundException if harvest not found', async () => {
    mockRepo.model.findUnique.mockResolvedValueOnce(null)

    const harvestId = faker.string.uuid()
    const dto = { name: '2025' }
    await expect(sut.execute(harvestId, dto)).rejects.toThrow(NotFoundException)

    expect(mockRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: harvestId },
    })
    expect(mockRepo.model.findFirst).not.toHaveBeenCalled()
    expect(mockRepo.model.update).not.toHaveBeenCalled()
  })

  it('should throw UnprocessableEntityException if harvest name already exist', async () => {
    mockRepo.model.findUnique.mockResolvedValueOnce(entityFaker.fake())
    mockRepo.model.findFirst.mockResolvedValueOnce(entityFaker.fake())

    const harvestId = faker.string.uuid()
    const dto = { name: '2025' }
    await expect(sut.execute(harvestId, dto)).rejects.toThrow(
      UnprocessableEntityException,
    )

    expect(mockRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: harvestId },
    })
    expect(mockRepo.model.findFirst).toHaveBeenCalledWith({
      where: { name: { equals: dto.name, mode: 'insensitive' } },
    })
    expect(mockRepo.model.update).not.toHaveBeenCalled()
  })
})
