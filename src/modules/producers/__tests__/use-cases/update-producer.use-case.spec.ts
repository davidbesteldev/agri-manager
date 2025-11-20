import { faker } from '@faker-js/faker'
import { NotFoundException } from '@nestjs/common'

import { createMockDeep } from '@app/common/tests/__mocks__/deep.mock'
import { EntityFaker } from '@app/common/tests/fakers/entity.faker'
import { createTestingModuleWithGlobals } from '@app/common/tests/helpers/create-testing-module-with-globals'

import { UpdateProducerDto } from '@app/modules/producers/dto'
import { ProducerEntity } from '@app/modules/producers/repositories/entities/producer.entity'
import { ProducerRepository } from '@app/modules/producers/repositories/producer.repository'
import { UpdateProducerUseCase } from '@app/modules/producers/use-cases'

describe('UpdateProducerUseCase', () => {
  let sut: UpdateProducerUseCase

  const mockProducerRepo = createMockDeep<ProducerRepository>()

  const dtoFaker = new EntityFaker(UpdateProducerDto)
  const entityFaker = new EntityFaker(ProducerEntity)

  beforeAll(async () => {
    const module = await createTestingModuleWithGlobals({
      providers: [
        UpdateProducerUseCase,
        { provide: ProducerRepository, useValue: mockProducerRepo },
      ],
    })

    sut = module.get<UpdateProducerUseCase>(UpdateProducerUseCase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should execute successfully', async () => {
    const producerId = faker.string.uuid()
    const dto = dtoFaker.fake()

    const entityFake = entityFaker.fake()
    mockProducerRepo.model.findUnique.mockResolvedValueOnce(entityFake)
    mockProducerRepo.model.update.mockResolvedValueOnce({ ...entityFake, ...dto })

    const result = await sut.execute(producerId, dto)

    expect(result).toBeDefined()
    expect(mockProducerRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: producerId },
    })
    expect(mockProducerRepo.model.update).toHaveBeenCalledWith({
      where: { id: producerId },
      data: dto,
    })
  })

  it('should throw NotFoundException if producer not found', async () => {
    mockProducerRepo.model.findUnique.mockResolvedValueOnce(null)

    const producerId = faker.string.uuid()
    const dto = dtoFaker.fake()
    await expect(sut.execute(producerId, dto)).rejects.toThrow(NotFoundException)

    expect(mockProducerRepo.model.findUnique).toHaveBeenCalledWith({
      where: { id: producerId },
    })
    expect(mockProducerRepo.model.update).not.toHaveBeenCalled()
  })
})
