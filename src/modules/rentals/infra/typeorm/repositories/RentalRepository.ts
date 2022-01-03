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
        id,
        car_id,
        expected_return_date,
        user_id,
        start_date,
        created_at,
        end_date,
        total
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            id,
            car_id,
            expected_return_date,
            user_id,
            start_date,
            created_at,
            end_date,
            total
        })

        await this.repository.save(rental)

        return rental
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id)
        return rental
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ['car']
        })
        return rentals
    }
}

export { RentalRepository }
