import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { AnalyticsSummaryUseCase } from '@app/modules/analytics/use-cases'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'

describe('AnalyticsSummaryUseCase', () => {
  let sut: AnalyticsSummaryUseCase

  const mockFarmRepo = createMockDeep<FarmRepository>()

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        AnalyticsSummaryUseCase,
        { provide: FarmRepository, useValue: mockFarmRepo },
      ],
    })

    sut = module.get<AnalyticsSummaryUseCase>(AnalyticsSummaryUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    mockFarmRepo.model.count.mockResolvedValueOnce(2)
    mockFarmRepo.model.aggregate.mockResolvedValueOnce({
      _avg: undefined,
      _count: undefined,
      _max: undefined,
      _min: undefined,
      _sum: { totalArea: 5, arableArea: 2, vegetationArea: 1 },
    })

    const where = {}
    const result = await sut.execute({})

    expect(result).toBeDefined()
    expect(mockFarmRepo.model.count).toHaveBeenCalledWith({ where })
    expect(mockFarmRepo.model.aggregate).toHaveBeenCalledWith({
      where,
      _sum: {
        totalArea: true,
        arableArea: true,
        vegetationArea: true,
      },
    })
  })
})
