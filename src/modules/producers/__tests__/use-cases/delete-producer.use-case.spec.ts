import { faker } from '@faker-js/faker'
import { NotFoundException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'
import { DeleteProducerUseCase } from '@app/modules/producers/use-cases'

describe('DeleteProducerUseCase', () => {
  let sut: DeleteProducerUseCase

  const mockProducerRepo = createMockDeep<ProducerRepository>()

  const entityFaker = new EntityFaker(ProducerEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        DeleteProducerUseCase,
        { provide: ProducerRepository, useValue: mockProducerRepo },
      ],
    })

    sut = module.get<DeleteProducerUseCase>(DeleteProducerUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    mockProducerRepo.model.findUnique.mockResolvedValueOnce(entityFaker.fake())

    const producerId = faker.string.uuid()
    await sut.execute(producerId)

    expect(mockProducerRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: producerId },
    })
    expect(mockProducerRepo.model.delete).toHaveBeenCalledWith({
      where: { id: producerId },
    })
  })

  it('should throw NotFoundException if producer not found', async () => {
    mockProducerRepo.model.findUnique.mockResolvedValueOnce(null)

    const producerId = faker.string.uuid()
    await expect(sut.execute(producerId)).rejects.toThrow(NotFoundException)

    expect(mockProducerRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: producerId },
    })
    expect(mockProducerRepo.model.delete).not.toHaveBeenCalled()
  })
})
