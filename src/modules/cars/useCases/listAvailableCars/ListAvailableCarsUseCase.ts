import { inject, injectable } from 'tsyringe'

import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'

interface IRequest {
    category_id?: string
    name?: string
    brand?: string
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository
    ) {}

    async execute({
        name = '',
        category_id = '',
        brand = ''
    }: IRequest): Promise<Car[]> {
        return this.carRepository.listAvailable(brand, category_id, name)
    }
}

export { ListAvailableCarsUseCase }
