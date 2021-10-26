import { inject, injectable } from 'tsyringe'

import { Specification } from '../../entities/Specification'
import { ISpecificationRepository } from '../../repositories/interface/ISpecificationRepository'

@injectable()
class ListSpecificationUseCase {
    constructor(
        @inject('SpecificationRepository')
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute(): Promise<Specification[]> {
        return this.specificationRepository.list()
    }
}

export { ListSpecificationUseCase }
