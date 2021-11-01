import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
    car_id: string
    specifications_ids: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository,
        @inject('SpecificationRepository')
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute({ car_id, specifications_ids }: IRequest): Promise<Car> {
        const carExists = await this.carRepository.findById(car_id)

        if (!carExists) throw new AppError('Car does not exist')

        const specifications = await this.specificationRepository.findByIds(
            specifications_ids
        )

        carExists.specifications = specifications

        await this.carRepository.create(carExists)

        return carExists
    }
}

export { CreateCarSpecificationUseCase }
