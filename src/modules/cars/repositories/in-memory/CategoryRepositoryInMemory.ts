import { v4 as uuidv4 } from 'uuid'

import { Category } from '@modules/cars/infra/typeorm/entities/Category'

import { ICategoryRepository, ICreateCategoryDTO } from '../ICategoryRepository'

class CategoryRepositoryInMemory implements ICategoryRepository {
    categories: Category[] = []
    async findByName(name: string): Promise<Category> {
        return this.categories.find((category) => category.name === name)
    }
    async list(): Promise<Category[]> {
        return this.categories
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = new Category()

        Object.assign(category, {
            name,
            description,
            id: uuidv4(),
            created_at: new Date()
        })

        this.categories.push(category)

        return category
    }

    async findById(id: string): Promise<Category> {
        return this.categories.find((category) => category.id === id)
    }
}

export { CategoryRepositoryInMemory }
