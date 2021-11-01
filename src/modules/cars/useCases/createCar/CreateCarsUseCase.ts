import { inject, injectable } from 'tsyringe'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateCarsUseCase {
    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository,
        @inject('CategoryRepository')
        private categoryRepository: ICategoryRepository
    ) {}

    async execute({
        brand,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        category_id
    }: ICreateCarDTO): Promise<Car> {
        if (category_id) {
            const categoryExists = await this.categoryRepository.findById(
                category_id
            )
            if (!categoryExists)
                throw new AppError('Category with that ID was not found!')
        }

        const carAlreadyExists = await this.carRepository.findByLicensePlate(
            license_plate
        )

        if (carAlreadyExists) throw new AppError('Car already exists!')

        const car = await this.carRepository.create({
            brand,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            category_id
        })

        return car
    }
}

export { CreateCarsUseCase }
