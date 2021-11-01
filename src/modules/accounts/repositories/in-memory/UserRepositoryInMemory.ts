import { v4 as uuidv4 } from 'uuid'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'

import { IUserRepository } from '../IUserRepository'

class UserRepositoryInMemory implements IUserRepository {
    users: User[] = []

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email)
    }
    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id)
    }
    async list(): Promise<User[]> {
        return this.users
    }
    async create({
        driver_license,
        email,
        name,
        password
    }: ICreateUserDTO): Promise<void> {
        const user = new User()
        Object.assign(user, {
            driver_license,
            email,
            name,
            password,
            id: uuidv4()
        })

        this.users.push(user)
    }
}

export { UserRepositoryInMemory }
