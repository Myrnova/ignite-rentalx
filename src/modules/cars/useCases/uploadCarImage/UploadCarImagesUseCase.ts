import { inject, injectable } from 'tsyringe'

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
    car_id: string
    images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject('CarImagesRepository')
        private carImagesRepository: ICarImagesRepository,

        @inject('CarRepository')
        private carRepository: ICarRepository
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        const carExists = await this.carRepository.findById(car_id)

        if (!carExists) throw new AppError('Car does not exist!')

        images_name.map(async (image) => {
            await this.carImagesRepository.create(car_id, image)
        })
    }
}

export { UploadCarImagesUseCase }
