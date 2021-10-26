import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { ListUsersUseCase } from './ListUsersUseCase'

class ListUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const listUsersUseCase = container.resolve(ListUsersUseCase)

            const all = await listUsersUseCase.execute()

            return response.status(200).json(all)
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }
}

export { ListUsersController }
