import { faker } from '@faker-js/faker'
import { NotFoundException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'
import { DeleteFarmUseCase } from '@app/modules/farms/use-cases'

describe('DeleteFarmUseCase', () => {
  let sut: DeleteFarmUseCase

  const mockFarmRepo = createMockDeep<FarmRepository>()
  const entityFaker = new EntityFaker(FarmEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [DeleteFarmUseCase, { provide: FarmRepository, useValue: mockFarmRepo }],
    })

    sut = module.get<DeleteFarmUseCase>(DeleteFarmUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    mockFarmRepo.model.findUnique.mockResolvedValueOnce(entityFaker.fake())

    const farmId = faker.string.uuid()
    await sut.execute(farmId)

    expect(mockFarmRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: farmId },
    })
    expect(mockFarmRepo.model.delete).toHaveBeenCalledWith({
      where: { id: farmId },
    })
  })

  it('should throw NotFoundException if farm not found', async () => {
    mockFarmRepo.model.findUnique.mockResolvedValueOnce(null)

    const farmId = faker.string.uuid()
    await expect(sut.execute(farmId)).rejects.toThrow(NotFoundException)

    expect(mockFarmRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: farmId },
    })
    expect(mockFarmRepo.model.delete).not.toHaveBeenCalled()
  })
})
