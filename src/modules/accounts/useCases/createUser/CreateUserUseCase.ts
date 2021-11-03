import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository
    ) {}

    async execute({
        name,
        email,
        password,
        driver_license
    }: ICreateUserDTO): Promise<void> {
        if (!name || !email || !password || !driver_license)
            throw new AppError(
                'Name, email, username, password or driver_license were not provided'
            )

        const passwordHash = await hash(password, 8)

        const userAlreadyExists = await this.userRepository.findByEmail(email)

        if (userAlreadyExists) throw new AppError('User already exists!')

        this.userRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        })
    }
}

export { CreateUserUseCase }
