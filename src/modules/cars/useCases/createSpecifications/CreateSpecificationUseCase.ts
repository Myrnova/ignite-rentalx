import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { ISpecificationRepository } from '../../repositories/interface/ISpecificationRepository'

interface IRequest {
    name: string
    description: string
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationRepository')
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        if (!name || !description)
            throw new AppError('Name or description were not provided')

        const specificationAlreadyExists =
            await this.specificationRepository.findByName(name)

        if (specificationAlreadyExists)
            throw new AppError('Specification already exists!')

        await this.specificationRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }
