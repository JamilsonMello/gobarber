import { Router } from 'express';

import ForgetPasswordController from '@modules/users/infra/http/controllers/ForgetPasswordController';
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';
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
