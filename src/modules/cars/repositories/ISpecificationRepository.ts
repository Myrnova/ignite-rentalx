import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'

interface ICreateSpecificationDTO {
    name: string
    description: string
}

interface ISpecificationRepository {
    create({
        description,
        name
    }: ICreateSpecificationDTO): Promise<Specification>

    findByName(name: string): Promise<Specification>

    findByIds(ids: string[]): Promise<Specification[]>

    list(): Promise<Specification[]>
}

export { ISpecificationRepository, ICreateSpecificationDTO }
