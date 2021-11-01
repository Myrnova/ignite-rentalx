import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory'
import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoryRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

import { CreateCarsUseCase } from './CreateCarsUseCase'

let createCarUseCase: CreateCarsUseCase
let carsRepositoryInMemory: CarRepositoryInMemory
let categoryRepositoryInMemory: CategoryRepositoryInMemory

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarRepositoryInMemory()
        categoryRepositoryInMemory = new CategoryRepositoryInMemory()
        createCarUseCase = new CreateCarsUseCase(
            carsRepositoryInMemory,
            categoryRepositoryInMemory
        )
    })

    it('should be able to create a new car without category', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name car',
            brand: 'Brand Test',
            daily_rate: 100,
            description: 'Description car',
            fine_amount: 60,
            license_plate: 'ABC-1234'
        })

        expect(car).toHaveProperty('id')
    })
    it('should be able to create a new car with category', async () => {
        const category = await categoryRepositoryInMemory.create({
            name: 'Category Test',
            description: 'Category description Test'
        })

        const car = await createCarUseCase.execute({
            name: 'Name car',
            brand: 'Brand Test',
            daily_rate: 100,
            description: 'Description car',
            fine_amount: 60,
            license_plate: 'ABC-1234',
            category_id: category.id
        })

        expect(car).toHaveProperty('id')
    })

    it('should not be able to create a car if there is already another one with same license plate ', () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: 'Name car',
                brand: 'Brand Test',
                daily_rate: 100,
                description: 'Description car',
                fine_amount: 60,
                license_plate: 'ABC-1234'
            })
            await createCarUseCase.execute({
                name: 'Name car 2',
                brand: 'Brand Test',
                daily_rate: 100,
                description: 'Description car',
                fine_amount: 60,
                license_plate: 'ABC-1234'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
    it('should be able to create a car available by default', async () => {
        const car = await createCarUseCase.execute({
            name: 'Name car available',
            brand: 'Brand Test',
            daily_rate: 100,
            description: 'Description car',
            fine_amount: 60,
            license_plate: 'ABCD-1234'
        })

        expect(car.available).toBe(true)
    })

    it('should not be able to create a new car if the passed category_id is not a valid one', async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: 'Name car 2',
                brand: 'Brand Test',
                daily_rate: 100,
                description: 'Description car',
                fine_amount: 60,
                license_plate: 'ABC-1234',
                category_id: 'category'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
