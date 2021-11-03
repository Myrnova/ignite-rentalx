import { inject, injectable } from 'tsyringe'

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
        private dateProvider: IDateProvider
    ) {}

    async execute({
        car_id,
        expected_return_date,
        user_id
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
            user_id,
            car_id,
            expected_return_date
        })

        return rental
    }
}

export { CreateRentalUseCase }
