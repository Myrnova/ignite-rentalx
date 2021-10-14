import { Router } from 'express'

import { createSpecificationController } from '../modules/cars/useCases/createSpecifications'
import { listSpecificationController } from '../modules/cars/useCases/listSpecification'

const specificationRoutes = Router()

specificationRoutes.post('/', (request, response) => {
    createSpecificationController.handle(request, response)
})

specificationRoutes.get('/', (request, response) => {
    listSpecificationController.handle(response)
})
export { specificationRoutes }
