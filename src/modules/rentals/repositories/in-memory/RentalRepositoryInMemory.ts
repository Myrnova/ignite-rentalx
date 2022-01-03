import { v4 as uuidv4 } from 'uuid'

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'

import { IRentalRepository } from '../IRentalRepository'

class RentalRepositoryInMemory implements IRentalRepository {
    rentals: Rental[] = []

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.car_id === car_id && !rental.end_date
        )
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.user_id === user_id && !rental.end_date
        )
    }
    async create({
        id,
        car_id,
        expected_return_date,
        user_id,
        start_date,
        created_at,
        end_date,
        total
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental()
        Object.assign(rental, {
            car_id,
            expected_return_date,
            user_id,
            id: id || uuidv4(),
            start_date: start_date || new Date(),
            created_at: created_at || new Date(),
            end_date,
            total,
            updated_at: id && new Date()
        })
        this.rentals.push(rental)

        return rental
    }

    async findById(id: string): Promise<Rental> {
        const rental = this.rentals.find((rental) => rental.id === id)
        return rental
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = this.rentals.filter(
            (rental) => rental.user_id === user_id
        )
        return rentals
    }
}

export { RentalRepositoryInMemory }
