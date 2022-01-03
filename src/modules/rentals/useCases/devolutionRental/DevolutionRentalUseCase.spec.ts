import dayjs from 'dayjs'

import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory'
import { RentalRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalRepositoryInMemory'
import { DayJsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayJsDateProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateRentalUseCase } from '../createRental/CreateRentalUseCase'
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase'

let devolutionRentalUseCase: DevolutionRentalUseCase
let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalRepositoryInMemory
let carRepositoryInMemory: CarRepositoryInMemory
let dayJsProvider: DayJsDateProvider

describe('Creaet Rental Car', () => {
    beforeEach(() => {
        rentalRepositoryInMemory = new RentalRepositoryInMemory()
        dayJsProvider = new DayJsDateProvider()
        carRepositoryInMemory = new CarRepositoryInMemory()
        devolutionRentalUseCase = new DevolutionRentalUseCase(
            rentalRepositoryInMemory,
            dayJsProvider,
            carRepositoryInMemory
        )
        createRentalUseCase = new CreateRentalUseCase(
            rentalRepositoryInMemory,
            dayJsProvider,
            carRepositoryInMemory
        )
    })

    const tomorrow = dayjs().add(1, 'day').toDate()

    it('should be able to create a new rental', async () => {
        const rental = await devolutionRentalUseCase.execute({
            user_id: '12345',
            car_id: '121212'
        })
        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })
    it('should not be able to create a new rental if there is one already opened to the same user', () => {
        expect(async () => {
            await devolutionRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212'
            })
            await devolutionRentalUseCase.execute({
                user_id: '12345',
                car_id: '12121244'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental if there is one already opened to the same car', () => {
        expect(async () => {
            await devolutionRentalUseCase.execute({
                user_id: '1234566',
                car_id: '121212'
            })
            await devolutionRentalUseCase.execute({
                user_id: '12345',
                car_id: '121212'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental with a invalid return time', () => {
        expect(async () => {
            await devolutionRentalUseCase.execute({
                user_id: '1234566',
                car_id: '121212'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
