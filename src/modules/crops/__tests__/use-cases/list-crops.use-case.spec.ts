import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { CropRepository } from '@app/modules/crops/repositories/crop.repository'
import { CropEntity } from '@app/modules/crops/repositories/entities/crop.entity'
import { ListCropsUseCase } from '@app/modules/crops/use-cases'
import { ListFarmsQueryDto } from '@app/modules/farms/dto'

describe('ListCropsUseCase', () => {
  let sut: ListCropsUseCase

  const mockRepo = createMockDeep<CropRepository>()

  const entityFaker = new EntityFaker(CropEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [ListCropsUseCase, { provide: CropRepository, useValue: mockRepo }],
    })

    sut = module.get<ListCropsUseCase>(ListCropsUseCase)
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
