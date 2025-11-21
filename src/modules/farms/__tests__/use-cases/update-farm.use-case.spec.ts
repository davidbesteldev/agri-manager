import { faker } from '@faker-js/faker'
import { NotFoundException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { UpdateFarmDto } from '@app/modules/farms/dto'
import { FarmCheckAreaHelper } from '@app/modules/farms/helpers'
import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'
import { UpdateFarmUseCase } from '@app/modules/farms/use-cases'

describe('UpdateFarmUseCase', () => {
  let sut: UpdateFarmUseCase

  const mockFarmRepo = createMockDeep<FarmRepository>()
  const mockFarmCheckAreaHelper = createMockDeep<FarmCheckAreaHelper>()

  const dtoFaker = new EntityFaker(UpdateFarmDto)
  const farmEntityFaker = new EntityFaker(FarmEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        UpdateFarmUseCase,
        { provide: FarmRepository, useValue: mockFarmRepo },
        { provide: FarmCheckAreaHelper, useValue: mockFarmCheckAreaHelper },
      ],
    })

    sut = module.get<UpdateFarmUseCase>(UpdateFarmUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    const entityFake = farmEntityFaker.fake()
    mockFarmRepo.model.findUnique.mockResolvedValueOnce(entityFake)
    mockFarmRepo.model.update.mockResolvedValueOnce(entityFake)

    const farmId = faker.string.uuid()
    const dto = dtoFaker.fake()
    const result = await sut.execute(farmId, dto)

    expect(result).toBeDefined()
    expect(mockFarmRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: farmId },
    })
    expect(mockFarmCheckAreaHelper.execute).toHaveBeenCalledWith({
      ...entityFake,
      ...dto,
    })
    expect(mockFarmRepo.model.update).toHaveBeenCalledWith({
      where: { id: farmId },
      data: dto,
    })
  })

  it('should throw NotFoundException if farm not found', async () => {
    mockFarmRepo.model.findUnique.mockResolvedValueOnce(null)

    const farmId = faker.string.uuid()
    const dto = dtoFaker.fake()
    await expect(sut.execute(farmId, dto)).rejects.toThrow(NotFoundException)

    expect(mockFarmRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: farmId },
    })
    expect(mockFarmCheckAreaHelper.execute).not.toHaveBeenCalled()
    expect(mockFarmRepo.model.update).not.toHaveBeenCalled()
  })
})
