import { NotFoundException, UnprocessableEntityException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { CropRepository } from '@app/modules/crops/repositories/crop.repository'
import { CropEntity } from '@app/modules/crops/repositories/entities/crop.entity'
import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'
import { HarvestEntity } from '@app/modules/harvests/repositories/entities/harvest.entity'
import { HarvestRepository } from '@app/modules/harvests/repositories/harvest.repository'
import { CreatePlantingDto } from '@app/modules/plantings/dto'
import { FarmCropEntity } from '@app/modules/plantings/repositories/entities/farm-crop.entity'
import { FarmCropRepository } from '@app/modules/plantings/repositories/farm-crop.repository'
import { CreatePlantingUseCase } from '@app/modules/plantings/use-cases'

describe('CreatePlantingUseCase', () => {
  let sut: CreatePlantingUseCase

  const mockFarmCropRepo = createMockDeep<FarmCropRepository>()
  const mockFarmRepo = createMockDeep<FarmRepository>()
  const mockCropRepo = createMockDeep<CropRepository>()
  const mockHarvestRepo = createMockDeep<HarvestRepository>()

  const entityFarmCropFaker = new EntityFaker(FarmCropEntity)
  const entityFarmFaker = new EntityFaker(FarmEntity)
  const entityCropFaker = new EntityFaker(CropEntity)
  const entityHarvestFaker = new EntityFaker(HarvestEntity)

  const dtoFaker = new EntityFaker(CreatePlantingDto)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        CreatePlantingUseCase,
        { provide: FarmCropRepository, useValue: mockFarmCropRepo },
        { provide: FarmRepository, useValue: mockFarmRepo },
        { provide: CropRepository, useValue: mockCropRepo },
        { provide: HarvestRepository, useValue: mockHarvestRepo },
      ],
    })

    sut = module.get<CreatePlantingUseCase>(CreatePlantingUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    mockFarmRepo.model.findUnique.mockResolvedValueOnce(entityFarmFaker.fake())
    mockCropRepo.model.findUnique.mockResolvedValueOnce(entityCropFaker.fake())
    mockHarvestRepo.model.findUnique.mockResolvedValueOnce(entityHarvestFaker.fake())
    mockFarmCropRepo.model.create.mockResolvedValueOnce(entityFarmCropFaker.fake())

    const dto = dtoFaker.fake()
    const result = await sut.execute(dto)

    expect(result).toBeDefined()
    expect(mockFarmRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: dto.farmId },
    })
    expect(mockCropRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: dto.cropId },
    })
    expect(mockHarvestRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: dto.harvestId },
    })
    expect(mockFarmCropRepo.model.create).toHaveBeenCalledWith({ data: dto })
  })

  it('should throw UnprocessableEntityException if planting already exist', async () => {
    mockFarmCropRepo.model.findFirst.mockResolvedValueOnce(entityFarmCropFaker.fake())

    const dto = dtoFaker.fake()
    await expect(sut.execute(dto)).rejects.toThrow(UnprocessableEntityException)

    expect(mockFarmCropRepo.model.create).not.toHaveBeenCalled()
  })

  it('should throw NotFoundException if farm not found', async () => {
    mockFarmRepo.model.findUnique.mockResolvedValueOnce(null)

    const dto = dtoFaker.fake()
    await expect(sut.execute(dto)).rejects.toThrow(NotFoundException)

    expect(mockFarmCropRepo.model.create).not.toHaveBeenCalled()
  })

  it('should throw NotFoundException if crop not found', async () => {
    mockFarmRepo.model.findUnique.mockResolvedValueOnce(entityFarmFaker.fake())
    mockCropRepo.model.findUnique.mockResolvedValueOnce(null)

    const dto = dtoFaker.fake()
    await expect(sut.execute(dto)).rejects.toThrow(NotFoundException)

    expect(mockFarmCropRepo.model.create).not.toHaveBeenCalled()
  })

  it('should throw NotFoundException if harvest not found', async () => {
    mockFarmRepo.model.findUnique.mockResolvedValueOnce(entityFarmFaker.fake())
    mockCropRepo.model.findUnique.mockResolvedValueOnce(entityCropFaker.fake())
    mockHarvestRepo.model.findUnique.mockResolvedValueOnce(null)

    const dto = dtoFaker.fake()
    await expect(sut.execute(dto)).rejects.toThrow(NotFoundException)

    expect(mockFarmCropRepo.model.create).not.toHaveBeenCalled()
  })
})
