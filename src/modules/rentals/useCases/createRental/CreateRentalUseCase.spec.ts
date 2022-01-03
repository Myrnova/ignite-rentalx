import dayjs from 'dayjs'

import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory'
import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoryRepositoryInMemory'
import { RentalRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalRepositoryInMemory'
import { DayJsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayJsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalRepositoryInMemory
let categoryRepositoryInMemory: CategoryRepositoryInMemory
let carRepositoryInMemory: CarRepositoryInMemory
let dayJsProvider: DayJsDateProvider

describe('Creaet Rental Car', () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory()
        rentalRepositoryInMemory = new RentalRepositoryInMemory()
        dayJsProvider = new DayJsDateProvider()
        carRepositoryInMemory = new CarRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(
            rentalRepositoryInMemory,
            dayJsProvider,
            carRepositoryInMemory
        )
    })

    const tomorrow = dayjs().add(1, 'day').toDate()

    it('should be able to create a new rental', async () => {
        const category = await categoryRepositoryInMemory.create({
            name: 'Teste',
            description: 'Teste'
        })

        const car = await carRepositoryInMemory.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'teste',
            fine_amount: 40,
            brand: 'brand',
            category_id: category.id
        })

        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: car.id,
            expected_return_date: tomorrow
        })
        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })
    it('should not be able to create a new rental if there is one already opened to the same user', () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: tomorrow
            })
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '12121244',
                expected_return_date: tomorrow
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental if there is one already opened to the same car', () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '1234566',
                car_id: '121212',
                expected_return_date: tomorrow
            })
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212',
                expected_return_date: tomorrow
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental with a invalid return time', () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '1234566',
                car_id: '121212',
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
