import { faker } from '@faker-js/faker'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { ListFarmsQueryDto } from '@app/modules/farms/dto'
import { FarmEntity } from '@app/modules/farms/repositories/entities/farm.entity'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'
import { ListFarmsUseCase } from '@app/modules/farms/use-cases'

describe('ListFarmsUseCase', () => {
  let sut: ListFarmsUseCase

  const mockFarmRepo = createMockDeep<FarmRepository>()
  const entityFaker = new EntityFaker(FarmEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [ListFarmsUseCase, { provide: FarmRepository, useValue: mockFarmRepo }],
    })

    sut = module.get<ListFarmsUseCase>(ListFarmsUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    const entityFake = entityFaker.fakeList(2)
    mockFarmRepo.findManyPaginated.mockResolvedValueOnce({
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
    expect(mockFarmRepo.findManyPaginated).toHaveBeenCalled()
  })

  it('should execute successfully with query params', async () => {
    const entityFake = entityFaker.fakeList(1)
    mockFarmRepo.findManyPaginated.mockResolvedValueOnce({
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
    expect(mockFarmRepo.findManyPaginated).toHaveBeenCalled()
  })

  it('should execute successfully with producer ID filter', async () => {
    const entityFake = entityFaker.fakeList(1)
    mockFarmRepo.findManyPaginated.mockResolvedValueOnce({
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

    const producerId = faker.string.uuid()
    const query: ListFarmsQueryDto = { producerId }
    const result = await sut.execute(query)

    expect(result.data).toHaveLength(entityFake.length)
    expect(mockFarmRepo.findManyPaginated).toHaveBeenCalledWith(query, {
      where: { producerId },
    })
  })
})
