import { v4 as uuidv4 } from 'uuid'

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'

class CarRepositoryInMemory implements ICarRepository {
    cars: Car[] = []

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
        const car = new Car()

        Object.assign(car, {
            brand,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            category_id,
            id: id || uuidv4(),
            created_at: new Date(),
            available: true,
            specifications,
            updated_at: id && new Date()
        })

        this.cars.push(car)
        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate)
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id)
    }

    async listAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        let availableCars = this.cars.filter((car) => car.available)

        if (!name && !brand && !category_id) return availableCars

        availableCars = availableCars.filter((car) => {
            if (car.name === name) return true
            if (car.brand === brand) return true
            if (car.category_id === category_id) return true

            return false
        })

        return availableCars
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const carIndex = this.cars.findIndex((car) => car.id === id)
        this.cars[carIndex].available = available
    }
}

export { CarRepositoryInMemory }
