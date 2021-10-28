import { inject, injectable } from 'tsyringe'

import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository'
import { AppError } from '@shared/errors/AppError'

interface IRequest {
    name: string
    description: string
}
@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoryRepository')
        private categoryRepository: ICategoryRepository
    ) {}

    async execute({ description, name }: IRequest): Promise<void> {
        if (!name || !description)
            throw new AppError('Name or description were not provided')

        const categoryAlreadyExists = await this.categoryRepository.findByName(
            name
        )

        if (categoryAlreadyExists)
            throw new AppError('Category already exists!')

        this.categoryRepository.create({ name, description })
    }
}

export { CreateCategoryUseCase }
