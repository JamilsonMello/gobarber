import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UserController from '@modules/users/infra/http/controllers/UserController';
import UpdateUserAvatarController from '@modules/users/infra/controllers/UpdateUserAvatarController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import * as validations from '../validations/user.routes';

const usersRoutes = Router();
const userController = new UserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const upload = multer(uploadConfig);

usersRoutes.post('/', validations.createUser, userController.create);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateUserAvatarController.update,
);

export default usersRoutes;
