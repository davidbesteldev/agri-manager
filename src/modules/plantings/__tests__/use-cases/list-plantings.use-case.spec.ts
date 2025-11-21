import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { ListFarmsQueryDto } from '@app/modules/farms/dto'
import { FarmCropEntity } from '@app/modules/plantings/repositories/entities/farm-crop.entity'
import { FarmCropRepository } from '@app/modules/plantings/repositories/farm-crop.repository'
import { ListPlantingsUseCase } from '@app/modules/plantings/use-cases'

describe('ListPlantingsUseCase', () => {
  let sut: ListPlantingsUseCase

  const mockRepo = createMockDeep<FarmCropRepository>()

  const entityFaker = new EntityFaker(FarmCropEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        ListPlantingsUseCase,
        { provide: FarmCropRepository, useValue: mockRepo },
      ],
    })

    sut = module.get<ListPlantingsUseCase>(ListPlantingsUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    const entityFake = entityFaker.fakeList(2)
    mockRepo.findManyPaginated.mockResolvedValueOnce({
      data: entityFake,
      meta: {
        total: entityFake.length,
        lastPage: 1,
        currentPage: 1,
        totalPerPage: 10,
        prevPage: null,
        nextPage: null,
      },
    })

    const result = await sut.execute()

    expect(result.data).toHaveLength(entityFake.length)
    expect(mockRepo.findManyPaginated).toHaveBeenCalled()
  })

  it('should execute successfully with query params', async () => {
    const entityFake = entityFaker.fakeList(1)
    mockRepo.findManyPaginated.mockResolvedValueOnce({
      data: entityFake,
      meta: {
        total: entityFake.length,
        lastPage: 1,
        currentPage: 1,
        totalPerPage: 10,
        prevPage: null,
        nextPage: null,
      },
    })

    const query: ListFarmsQueryDto = { page: '1', size: '1' }
    const result = await sut.execute(query)

    expect(result.data).toHaveLength(entityFake.length)
    expect(mockRepo.findManyPaginated).toHaveBeenCalled()
  })
})
