import { inject, injectable } from 'tsyringe'

import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalRepository')
        private rentalRepository: IRentalRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider,
        @inject('CarRepository')
        private carRepository: ICarRepository
    ) {}

    async execute({
        rental_id,
        car_id,
        expected_return_date,
        user_id,
        total,
        end_date
    }: ICreateRentalDTO): Promise<Rental> {
        const minimumHour = 24

        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
            car_id
        )

        if (carUnavailable)
            throw new AppError("Car is unavailable or car doesn't exists")

        const userRentalOpen = await this.rentalRepository.findOpenRentalByUser(
            user_id
        )

        if (userRentalOpen)
            throw new AppError('There is a rental in progress for this user!')

        const compareInHours = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        )

        if (compareInHours < minimumHour)
            throw new AppError('Invalid return time!')

        const rental = await this.rentalRepository.create({
            rental_id,
            user_id,
            car_id,
            expected_return_date,
            total,
            end_date
        })
        await this.carRepository.updateAvailable(car_id, false)

        return rental
    }
}

export { CreateRentalUseCase }
