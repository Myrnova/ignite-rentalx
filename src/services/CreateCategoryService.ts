import { ICategoriesRepository } from '../repositories/interface/ICategoriesRepository'

interface IRequest {
    name: string
    description: string
}
// services não pode ter a responsabilidade de ter a dependencia do repositorio, então deixamos a responsabilidade pra quem esta chamando o service
class CreateCategoryService {
    /* 
ao fazer o categoriesRepository depender da interface de category e não da classe em si, 
é possível utilizar os métodos das classes que implementam essa interface sem modificar a implementação
 */
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ description, name }: IRequest): void {
        const categoryAlreadyExists = this.categoriesRepository.findByName(name)

        if (categoryAlreadyExists) throw new Error('Category already exists!')

        this.categoriesRepository.create({ name, description })
    }
}

export { CreateCategoryService }
