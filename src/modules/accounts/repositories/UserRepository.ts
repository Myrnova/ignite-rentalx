import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'
import { IUserRepository } from './interface/IUserRepository'

class UserRepository implements IUserRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    async create({
        id,
        name,
        password,
        email,
        driver_license,
        avatar
    }: ICreateUserDTO): Promise<void> {
        const category = this.repository.create({
            id,
            name,
            email,
            driver_license,
            password,
            avatar
        })

        await this.repository.save(category)
    }

    async list(): Promise<User[]> {
        const users = await this.repository.find()
        return users
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            email
        })

        return user
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id)

        return user
    }
}

export { UserRepository }
