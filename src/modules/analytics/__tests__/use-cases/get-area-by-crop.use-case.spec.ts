import { DatabaseService } from '@app/core/database/database.service'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { AnalyticsGetAreaByCropResponseDto } from '@app/modules/analytics/dto'
import { AnalyticsGetAreaByCropUseCase } from '@app/modules/analytics/use-cases'

describe('AnalyticsGetAreaByCropUseCase', () => {
  let sut: AnalyticsGetAreaByCropUseCase

  const mockDatabaseService = createMockDeep<DatabaseService>()

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        AnalyticsGetAreaByCropUseCase,
        { provide: DatabaseService, useValue: mockDatabaseService },
      ],
    })

    sut = module.get<AnalyticsGetAreaByCropUseCase>(AnalyticsGetAreaByCropUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    const mockResult = new EntityFaker(AnalyticsGetAreaByCropResponseDto).fakeList(2)
    mockDatabaseService.$queryRaw.mockResolvedValueOnce(mockResult)

    const result = await sut.execute({})

    expect(result).toBeDefined()
    expect(mockDatabaseService.$queryRaw).toHaveBeenCalled()
  })
})
