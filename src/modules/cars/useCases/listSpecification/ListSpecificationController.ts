import { Response } from 'express'

import { ListSpecificationUseCase } from './ListSpecificationUseCase'

class ListSpecificationController {
    constructor(private listSpecificationUseCase: ListSpecificationUseCase) {}

    handle(response: Response): Response {
        const all = this.listSpecificationUseCase.execute()

        return response.json(all)
    }
}

export { ListSpecificationController }
