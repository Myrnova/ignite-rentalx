import { inject, injectable } from 'tsyringe'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository'

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject('CategoryRepository')
        private categoriesRepository: ICategoryRepository
    ) {}

    async execute(): Promise<Category[]> {
        return this.categoriesRepository.list()
    }
}

export { ListCategoriesUseCase }
