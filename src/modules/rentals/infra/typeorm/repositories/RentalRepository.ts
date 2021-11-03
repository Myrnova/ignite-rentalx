import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO'
import { IRentalRepository } from '@modules/rentals/repositories/IRentalRepository'

import { Rental } from '../entities/Rental'

class RentalRepository implements IRentalRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental)
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openRentalCar = await this.repository.findOne({
            car_id,
            end_date: null
        })

        return openRentalCar
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openRentalUser = await this.repository.findOne({
            user_id,
            end_date: null
        })

        return openRentalUser
    }
    async create({
        car_id,
        expected_return_date,
        user_id
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id
        })

        await this.repository.save(rental)

        return rental
    }
}

export { RentalRepository }
