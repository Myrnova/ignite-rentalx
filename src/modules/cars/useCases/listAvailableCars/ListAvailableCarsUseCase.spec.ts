import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory'
import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoryRepositoryInMemory'

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listAvailableCarUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarRepositoryInMemory
let categoryRepositoryInMemory: CategoryRepositoryInMemory

describe('List Available Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarRepositoryInMemory()
        categoryRepositoryInMemory = new CategoryRepositoryInMemory()
        listAvailableCarUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        )
    })

    it('should be able to list all available cars', async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: 'Name car',
            brand: 'Brand Test',
            daily_rate: 100,
            description: 'Description car',
            fine_amount: 60,
            license_plate: 'ABC-1234'
        })
        const car2 = await carsRepositoryInMemory.create({
            name: 'Name car',
            brand: 'Brand Test',
            daily_rate: 100,
            description: 'Description car',
            fine_amount: 60,
            license_plate: 'ABC-12345'
        })
        const car3 = await carsRepositoryInMemory.create({
            name: 'Name car',
            brand: 'Brand Test',
            daily_rate: 100,
            description: 'Description car',
            fine_amount: 60,
            license_plate: 'ABC-123456'
        })

        const arrayCar = []
        arrayCar.push(car1)
        arrayCar.push(car2)
        arrayCar.push(car3)

        const cars = await listAvailableCarUseCase.execute({})

        expect(cars).toEqual(arrayCar)
    })

    it('should be able to list all available cars by brand', async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: 'Name car',
            brand: 'Brand Test',
            daily_rate: 100,
            description: 'Description car',
            fine_amount: 60,
            license_plate: 'ABC-1234'
        })

        const cars = await listAvailableCarUseCase.execute({
            brand: 'Brand Test'
        })

        expect(cars).toEqual([car1])
    })

    it('should be able to list all available cars by name', async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: 'Name car',
            brand: 'Brand Test',
            daily_rate: 100,
            description: 'Description car',
            fine_amount: 60,
            license_plate: 'ABC-1234'
        })

        const cars = await listAvailableCarUseCase.execute({
            name: 'Name car'
        })

        expect(cars).toEqual([car1])
    })

    it('should be able to list all available cars by category', async () => {
        const category = {
            name: 'Category Test',
            description: 'Category description Test'
        }

        await categoryRepositoryInMemory.create({
            name: category.name,
            description: category.description
        })

        const categoryCreated = await categoryRepositoryInMemory.findByName(
            category.name
        )

        const car1 = await carsRepositoryInMemory.create({
            name: 'Name car',
            brand: 'Brand Test',
            daily_rate: 100,
            description: 'Description car',
            fine_amount: 60,
            license_plate: 'ABC-1234',
            category_id: categoryCreated.id
        })

        const cars = await listAvailableCarUseCase.execute({
            category_id: categoryCreated.id
        })

        expect(cars).toEqual([car1])
    })
})
