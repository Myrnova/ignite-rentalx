import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUserRepository } from '../../repositories/interface/IUserRepository'

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
