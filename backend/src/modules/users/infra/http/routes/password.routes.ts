import { Router } from 'express';

import ForgetPasswordController from '@modules/users/infra/controllers/ForgetPasswordController';
import ResetPasswordController from '@modules/users/infra/controllers/ResetPasswordController';
import * as validations from '../validations/password.routes';

const routes = Router();

const forgetPasswordController = new ForgetPasswordController();
const resetPasswordController = new ResetPasswordController();

routes.patch(
  '/forget',
  validations.forgetPassword,
  forgetPasswordController.create,
);
routes.patch(
  '/reset',
  validations.resetPassword,
  resetPasswordController.create,
);

export default routes;
