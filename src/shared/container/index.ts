import { container } from 'tsyringe'

import { IUserRepository } from '../../modules/accounts/repositories/interface/IUserRepository'
import { UserRepository } from '../../modules/accounts/repositories/UserRepository'
import { CategoryRepository } from '../../modules/cars/repositories/CategoryRepository'
import { ICategoryRepository } from '../../modules/cars/repositories/interface/ICategoryRepository'
import { ISpecificationRepository } from '../../modules/cars/repositories/interface/ISpecificationRepository'
import { SpecificationRepository } from '../../modules/cars/repositories/SpecificationRepository'

container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoryRepository
)

container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepository',
    SpecificationRepository
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
