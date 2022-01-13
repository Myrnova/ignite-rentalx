import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory'
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory'

import { AppError } from '../../../../shared/errors/AppError'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarRepositoryInMemory()
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        )
    })

    it('should be able to add a new specification to the car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Name car',
            brand: 'Brand Test',
            daily_rate: 100,
            description: 'Description car',
            fine_amount: 60,
            license_plate: 'ABC-1234'
        })

        const specification = await specificationRepositoryInMemory.create({
            description: 'test',
            name: 'test'
        })

        const specifications_ids = [specification.id]

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_ids
        })

        expect(specificationsCars).toHaveProperty('specifications')

        expect(specificationsCars.specifications.length).toBe(1)
    })

    it('should not be able to add a new specification to an non-existing car', async () => {
        const car_id = '1234'
        const specifications_ids = ['54321']
        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specifications_ids
            })
        ).rejects.toEqual(new AppError('Car does not exist'))
    })
})
