import { Category } from '@modules/cars/infra/typeorm/entities/Category'

// DTO => Data transfer object
interface ICreateCategoryDTO {
    name: string
    description: string
}

interface ICategoryRepository {
    findByName(name: string): Promise<Category>
    findById(id: string): Promise<Category>
    list(): Promise<Category[]>
    create(data: ICreateCategoryDTO): Promise<Category>
}

export { ICategoryRepository, ICreateCategoryDTO }
