import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController'
import { UpdaterUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUsersController = new CreateUserController()
const listUsersController = new ListUsersController()
const updaterUserAvatarController = new UpdaterUserAvatarController()

usersRoutes.post('/', createUsersController.handle)

usersRoutes.get('/', listUsersController.handle)

usersRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single('avatar'),
    updaterUserAvatarController.handle
)

export { usersRoutes }
