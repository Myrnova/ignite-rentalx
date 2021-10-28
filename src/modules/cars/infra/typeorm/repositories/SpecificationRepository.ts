import { getRepository, Repository } from 'typeorm'

import {
    ICreateSpecificationDTO,
    ISpecificationRepository
} from '@modules/cars/repositories/ISpecificationRepository'

import { Specification } from '../entities/Specification'

class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }

    async create({
        description,
        name
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description
        })

        await this.repository.save(specification)
    }

    async findByName(name: string): Promise<Specification> {
        return this.repository.findOne({ name })
    }

    async list(): Promise<Specification[]> {
        return this.repository.find()
    }
}

export { SpecificationRepository }
