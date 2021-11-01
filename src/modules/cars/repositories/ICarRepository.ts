import { ICreateCarDTO } from '../dtos/ICreateCarDTO'
import { Car } from '../infra/typeorm/entities/Car'

interface ICarRepository {
    create(data: ICreateCarDTO): Promise<Car>

    findByLicensePlate(license_plate: string): Promise<Car>

    findById(id: string): Promise<Car>

    listAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]>
}

export { ICarRepository }
