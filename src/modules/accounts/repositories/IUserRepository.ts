import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'

// DTO => Data transfer object

interface IUserRepository {
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
    list(): Promise<User[]>
    create(data: ICreateUserDTO): Promise<void>
}

export { IUserRepository }
