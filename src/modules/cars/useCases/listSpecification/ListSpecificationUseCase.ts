import { inject, injectable } from 'tsyringe'

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'

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
