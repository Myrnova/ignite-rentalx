import { getRepository, Repository } from 'typeorm'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'

import { ICarRepository } from '../../../repositories/ICarRepository'
import { Car } from '../entities/Car'

class CarRepository implements ICarRepository {
    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car)
    }

    async create({
        id,
        brand,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        category_id,
        specifications
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            id,
            brand,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            category_id,
            specifications
        })

        await this.repository.save(car)

        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate
        })

        return car
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id)

        return car
    }

    async listAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder('c')
            .where('available = :available', { available: true })
            .leftJoinAndSelect('c.specifications', 'specifications')

        if (brand) {
            carsQuery.andWhere('c.brand = :brand', { brand })
        }
        if (category_id) {
            carsQuery.andWhere('c.category_id = :category_id', { category_id })
        }
        if (name) {
            carsQuery.andWhere('c.name = :name', { name })
        }

        return carsQuery.getMany()
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where('id = :id', { id })
            .execute()
    }
}

export { CarRepository }
