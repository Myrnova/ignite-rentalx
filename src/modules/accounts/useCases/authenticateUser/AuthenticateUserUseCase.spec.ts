import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory'
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase'
import { AppError } from '@shared/errors/AppError'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let userRepositoryInMemory: UserRepositoryInMemory

let authenticateUserUseCase: AuthenticateUserUseCase

let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemory
        )
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: 'user@teste.com',
            password: '1234',
            name: 'User Test'
        }

        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty('token')
    })

    it('should not be able to authenticate a nonexistent user', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false@teste.com',
                password: '1234'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
    it('should not be able to authenticate with an incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '000123',
                email: 'user@teste.com',
                password: '1234',
                name: 'User Test'
            }

            await createUserUseCase.execute(user)

            await authenticateUserUseCase.execute({
                email: 'user@teste.com',
                password: 'incorrectPassword'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to authenticate with an incorrect email', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '000123',
                email: 'user@teste.com',
                password: '1234',
                name: 'User Test'
            }

            await createUserUseCase.execute(user)

            await authenticateUserUseCase.execute({
                email: 'incorrect@teste.com',
                password: '1234'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
