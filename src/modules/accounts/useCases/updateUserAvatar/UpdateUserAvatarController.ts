import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AppError } from '../../../../shared/errors/AppError'
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase'

class UpdaterUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user
        const avatar_file = request.file.filename
        if (!avatar_file) throw new AppError('Avatar not provided!')
        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase
        )

        await updateUserAvatarUseCase.execute({ avatar_file, user_id: id })
        return response.status(204).send()
    }
}

export { UpdaterUserAvatarController }
