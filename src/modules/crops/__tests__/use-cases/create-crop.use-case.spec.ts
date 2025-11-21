import { UnprocessableEntityException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'
import { removeAccents } from '@app/common/utils'

import { CreateCropDto } from '@app/modules/crops/dto'
import { CropRepository } from '@app/modules/crops/repositories/crop.repository'
import { CropEntity } from '@app/modules/crops/repositories/entities/crop.entity'
import { CreateCropUseCase } from '@app/modules/crops/use-cases'

describe('CreateCropUseCase', () => {
  let sut: CreateCropUseCase

  const mockRepo = createMockDeep<CropRepository>()

  const dtoFaker = new EntityFaker(CreateCropDto)
  const entityFaker = new EntityFaker(CropEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [CreateCropUseCase, { provide: CropRepository, useValue: mockRepo }],
    })

    sut = module.get<CreateCropUseCase>(CreateCropUseCase)
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
      where: { name: { equals: removeAccents(dto.name), mode: 'insensitive' } },
    })
    expect(mockRepo.model.create).toHaveBeenCalledWith({ data: dto })
  })

  it('should throw UnprocessableEntityException if crop name already exist', async () => {
    mockRepo.model.findFirst.mockResolvedValueOnce(entityFaker.fake())

    const dto = dtoFaker.fake()
    await expect(sut.execute(dto)).rejects.toThrow(UnprocessableEntityException)

    expect(mockRepo.model.findFirst).toHaveBeenCalledWith({
      where: { name: { equals: removeAccents(dto.name), mode: 'insensitive' } },
    })
    expect(mockRepo.model.create).not.toHaveBeenCalled()
  })
})
