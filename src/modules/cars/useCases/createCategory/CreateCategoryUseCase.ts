import { ICategoryRepository } from '../../repositories/interface/ICategoryRepository'

interface IRequest {
    name: string
    description: string
}
// services não pode ter a responsabilidade de ter a dependencia do repositorio, então deixamos a responsabilidade pra quem esta chamando o service
class CreateCategoryUseCase {
    /* 
    ao fazer o categoriesRepository depender da interface de category e não da classe em si, 
    é possível utilizar os métodos das classes que implementam essa interface sem modificar a implementação
     */
    constructor(private categoryRepository: ICategoryRepository) {}

    async execute({ description, name }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoryRepository.findByName(
            name
        )

        if (categoryAlreadyExists) throw new Error('Category already exists!')

        this.categoryRepository.create({ name, description })
    }
}

export { CreateCategoryUseCase }
