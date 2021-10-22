import { Specification } from '../entities/Specification'
import {
    ICreateSpecificationDTO,
    ISpecificationRepository
} from './interface/ISpecificationRepository'

class SpecificationRepository implements ISpecificationRepository {
    private specifications: Specification[]

    constructor() {
        this.specifications = []
    }

    // #region Singleton Pattern
    private static INSTANCE: SpecificationRepository

    public static getInstance(): SpecificationRepository {
        if (!SpecificationRepository.INSTANCE)
            SpecificationRepository.INSTANCE = new SpecificationRepository()

        return SpecificationRepository.INSTANCE
    }
    // #endregion

    create({ description, name }: ICreateSpecificationDTO): void {
        const specification = new Specification()
        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        })

        this.specifications.push(specification)
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(
            (specification) => specification.name === name
        )

        return specification
    }

    list(): Specification[] {
        return this.specifications
    }
}

export { SpecificationRepository }
