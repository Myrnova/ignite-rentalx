import { Response } from 'express'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

    handle(response: Response): Response {
        const all = this.listCategoriesUseCase.execute()

        return response.json(all)
    }
}

export { ListCategoriesController }
