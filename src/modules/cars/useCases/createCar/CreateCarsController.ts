import { Response, Request } from 'express'
import { container } from 'tsyringe'

import { CreateCarsUseCase } from './CreateCarsUseCase'

class CreateCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            brand,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            category_id
        } = request.body

        const createCarUseCase = container.resolve(CreateCarsUseCase)

        const car = await createCarUseCase.execute({
            brand,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            category_id
        })

        return response.status(201).json(car)
    }
}

export { CreateCarsController }
