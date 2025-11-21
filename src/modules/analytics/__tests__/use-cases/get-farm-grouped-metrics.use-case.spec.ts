import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { AnalyticsGetFarmGroupedMetricsUseCase } from '@app/modules/analytics/use-cases'
import { FarmRepository } from '@app/modules/farms/repositories/farm.repository'

describe('AnalyticsGetFarmGroupedMetricsUseCase', () => {
  let sut: AnalyticsGetFarmGroupedMetricsUseCase

  const mockFarmRepo = createMockDeep<FarmRepository>()

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        AnalyticsGetFarmGroupedMetricsUseCase,
        { provide: FarmRepository, useValue: mockFarmRepo },
      ],
    })

    sut = module.get<AnalyticsGetFarmGroupedMetricsUseCase>(
      AnalyticsGetFarmGroupedMetricsUseCase,
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    mockFarmRepo.model.groupBy.mockResolvedValueOnce([
      { state: 'PR', _count: { id: 1 }, _sum: { totalArea: 1 } },
    ] as any) // TODO Melhorar

    const where = {}
    const result = await sut.execute({})

    expect(result).toBeDefined()
    expect(mockFarmRepo.model.groupBy).toHaveBeenCalledWith({
      by: ['state'],
      where,
      _sum: { totalArea: true },
      _count: { id: true },
      orderBy: {
        _sum: { totalArea: 'desc' },
      },
    })
  })
})
