import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { AppError } from '@shared/errors/AppError'

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = request.headers.authorization

    if (!authHeader) throw new AppError('Token missing', 401)

    const [, token] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(
            token,
            '8eabb14b927a8f90b3060ad10e972dac'
        ) as IPayload

        const userRepository = new UserRepository()
        const user = await userRepository.findById(user_id)
        if (!user) throw new AppError("User doesn't exist", 401)

        request.user = {
            id: user_id
        }

        next()
    } catch (error) {
        throw new AppError('Invalid token', 401)
    }
}
