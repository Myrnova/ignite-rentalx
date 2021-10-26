import { inject, injectable } from 'tsyringe'

import { User } from '../../entities/User'
import { IUserRepository } from '../../repositories/interface/IUserRepository'

@injectable()
class ListUsersUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ) {}

    async execute(): Promise<User[]> {
        return this.usersRepository.list()
    }
}

export { ListUsersUseCase }
