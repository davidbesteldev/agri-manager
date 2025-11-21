import { UnprocessableEntityException } from '@nestjs/common'

import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { FarmCheckAreaHelper } from '@app/modules/farms/helpers'

describe('FarmCheckAreaHelper', () => {
  let sut: FarmCheckAreaHelper

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [FarmCheckAreaHelper],
    })

    sut = module.get<FarmCheckAreaHelper>(FarmCheckAreaHelper)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', () => {
    expect(() => {
      sut.execute({ arableArea: 1, vegetationArea: 1, totalArea: 5 })
    }).not.toThrow()
  })

  it('should throw UnprocessableEntityException if sum of the areas cannot exceed the farms total', () => {
    expect(() => {
      sut.execute({ arableArea: 3, vegetationArea: 3, totalArea: 5 })
    }).toThrow(UnprocessableEntityException)
  })
})
