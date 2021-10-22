import { Category } from '../../entities/Category'

// DTO => Data transfer object
interface ICreateCategoryDTO {
    name: string
    description: string
}

interface ICategoryRepository {
    findByName(name: string): Promise<Category>
    list(): Promise<Category[]>
    create(data: ICreateCategoryDTO): Promise<void>
}

export { ICategoryRepository, ICreateCategoryDTO }
