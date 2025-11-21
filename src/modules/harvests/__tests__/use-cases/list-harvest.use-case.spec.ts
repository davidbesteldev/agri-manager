import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { ListFarmsQueryDto } from '@app/modules/farms/dto'
import { HarvestEntity } from '@app/modules/harvests/repositories/entities/harvest.entity'
import { HarvestRepository } from '@app/modules/harvests/repositories/harvest.repository'
import { ListHarvestsUseCase } from '@app/modules/harvests/use-cases'

describe('ListHarvestsUseCase', () => {
  let sut: ListHarvestsUseCase

  const mockRepo = createMockDeep<HarvestRepository>()

  const entityFaker = new EntityFaker(HarvestEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        ListHarvestsUseCase,
        { provide: HarvestRepository, useValue: mockRepo },
      ],
    })

    sut = module.get<ListHarvestsUseCase>(ListHarvestsUseCase)
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
