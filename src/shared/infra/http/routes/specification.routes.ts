import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecifications/CreateSpecificationController'
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/ListSpecificationController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const specificationRoutes = Router()

const createSpecificationController = new CreateSpecificationController()
const listSpecificationController = new ListSpecificationController()

specificationRoutes.use(ensureAuthenticated)

specificationRoutes.post('/', createSpecificationController.handle)

specificationRoutes.get('/', listSpecificationController.handle)
export { specificationRoutes }
