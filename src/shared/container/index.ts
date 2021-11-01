import { container } from 'tsyringe'

import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository'
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository'
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository'
import { CarRepository } from '@modules/cars/infra/typeorm/repositories/CarRepository'
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { ICarRepository } from '@modules/cars/repositories/ICarRepository'
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'

container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoryRepository
)

container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepository',
    SpecificationRepository
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton<ICarRepository>('CarRepository', CarRepository)

container.registerSingleton<ICarImagesRepository>(
    'CarImagesRepository',
    CarImagesRepository
)
