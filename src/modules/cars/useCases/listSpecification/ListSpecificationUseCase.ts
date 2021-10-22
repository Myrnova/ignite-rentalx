import { Specification } from '../../entities/Specification'
import { ISpecificationRepository } from '../../repositories/interface/ISpecificationRepository'

class ListSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {}

    execute(): Specification[] {
        console.log('teste')
        return this.specificationRepository.list()
    }
}

export { ListSpecificationUseCase }
