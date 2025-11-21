import { faker } from '@faker-js/faker'
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'
import { removeAccents } from '@app/common/utils'

import { CropRepository } from '@app/modules/crops/repositories/crop.repository'
import { CropEntity } from '@app/modules/crops/repositories/entities/crop.entity'
import { UpdateCropUseCase } from '@app/modules/crops/use-cases'

describe('UpdateCropUseCase', () => {
  let sut: UpdateCropUseCase

  const mockRepo = createMockDeep<CropRepository>()

  const entityFaker = new EntityFaker(CropEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [UpdateCropUseCase, { provide: CropRepository, useValue: mockRepo }],
    })

    sut = module.get<UpdateCropUseCase>(UpdateCropUseCase)
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

    const cropId = faker.string.uuid()
    const dto = { name: 'Soja' }
    const result = await sut.execute(cropId, dto)

    expect(result).toBeDefined()
    expect(mockRepo.model.findUnique).toHaveBeenCalledWith({ where: { id: cropId } })
    expect(mockRepo.model.findFirst).toHaveBeenCalledWith({
      where: { name: { equals: removeAccents(dto.name), mode: 'insensitive' } },
    })
    expect(mockRepo.model.update).toHaveBeenCalledWith({
      where: { id: cropId },
      data: dto,
    })
  })

  it('should throw NotFoundException if crop not found', async () => {
    mockRepo.model.findUnique.mockResolvedValueOnce(null)

    const cropId = faker.string.uuid()
    const dto = { name: 'Soja' }
    await expect(sut.execute(cropId, dto)).rejects.toThrow(NotFoundException)

    expect(mockRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: cropId },
    })
    expect(mockRepo.model.findFirst).not.toHaveBeenCalled()
    expect(mockRepo.model.update).not.toHaveBeenCalled()
  })

  it('should throw UnprocessableEntityException if crop name already exist', async () => {
    mockRepo.model.findUnique.mockResolvedValueOnce(entityFaker.fake())
    mockRepo.model.findFirst.mockResolvedValueOnce(entityFaker.fake())

    const cropId = faker.string.uuid()
    const dto = { name: 'Soja' }
    await expect(sut.execute(cropId, dto)).rejects.toThrow(UnprocessableEntityException)

    expect(mockRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: cropId },
    })
    expect(mockRepo.model.findFirst).toHaveBeenCalledWith({
      where: { name: { equals: removeAccents(dto.name), mode: 'insensitive' } },
    })
    expect(mockRepo.model.update).not.toHaveBeenCalled()
  })
})
