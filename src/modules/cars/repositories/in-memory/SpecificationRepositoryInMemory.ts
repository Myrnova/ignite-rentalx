import { v4 as uuidv4 } from 'uuid'

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import {
    ICreateSpecificationDTO,
    ISpecificationRepository
} from '@modules/cars/repositories/ISpecificationRepository'

class SpecificationRepositoryInMemory implements ISpecificationRepository {
    specifications: Specification[] = []

    async create({
        description,
        name
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification()
        Object.assign(specification, {
            description,
            name,
            id: uuidv4(),
            created_at: new Date()
        })
        this.specifications.push(specification)

        return specification
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            (specification) => specification.name === name
        )
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) =>
            ids.includes(specification.id)
        )

        return allSpecifications
    }
    async list(): Promise<Specification[]> {
        return this.specifications
    }
}

export { SpecificationRepositoryInMemory }
