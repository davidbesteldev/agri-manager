import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { ListProducersQueryDto } from '@app/modules/producers/dto'
import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'
import { ListProducersUseCase } from '@app/modules/producers/use-cases'

describe('ListProducersUseCase', () => {
  let sut: ListProducersUseCase

  const mockProducerRepo = createMockDeep<ProducerRepository>()

  const entityFaker = new EntityFaker(ProducerEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        ListProducersUseCase,
        { provide: ProducerRepository, useValue: mockProducerRepo },
      ],
    })

    sut = module.get<ListProducersUseCase>(ListProducersUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    const entityFake = entityFaker.fakeList(2)
    mockProducerRepo.findManyPaginated.mockResolvedValueOnce({
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
    expect(mockProducerRepo.findManyPaginated).toHaveBeenCalledWith(undefined)
  })
  it('should execute successfully with query params', async () => {
    const entityFake = entityFaker.fakeList(1)
    mockProducerRepo.findManyPaginated.mockResolvedValueOnce({
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

    const query: ListProducersQueryDto = { page: '1', size: '1' }
    const result = await sut.execute(query)

    expect(result.data).toHaveLength(entityFake.length)
    expect(mockProducerRepo.findManyPaginated).toHaveBeenCalledWith(query)
  })
})
