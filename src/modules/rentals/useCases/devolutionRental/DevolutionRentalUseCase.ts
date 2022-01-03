import { inject, injectable } from 'tsyringe'

import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { IDevolutionRentalDTO } from '@modules/rentals/dtos/IDevolutionRentalDTO'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository'
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
class DevolutionRentalUseCase {
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
        user_id
    }: IDevolutionRentalDTO): Promise<Rental> {
        const minimum_daily = 1

        const rental = await this.rentalRepository.findById(rental_id)

        if (!rental) throw new AppError("Rental doesn't exist")

        const car = await this.carRepository.findById(rental.car_id)

        const dateNow = this.dateProvider.dateNow()

        let daily = this.dateProvider.compareInDays(rental.start_date, dateNow)
        if (daily <= 0) daily = minimum_daily

        const delay = this.dateProvider.compareInDays(
            rental.expected_return_date,
            dateNow
        )
        let total = 0
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount
            total += calculate_fine
        }

        total += daily * car.daily_rate
        rental.end_date = dateNow
        rental.total = total

        await this.rentalRepository.create(rental)

        await this.carRepository.updateAvailable(car.id, true)

        return rental
    }
}

export { DevolutionRentalUseCase }
