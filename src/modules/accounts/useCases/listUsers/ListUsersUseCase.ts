import { inject, injectable } from 'tsyringe'

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'

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
