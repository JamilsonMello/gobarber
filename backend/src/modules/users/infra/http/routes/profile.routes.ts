import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';
import * as validations from '../validations/profile.routes';

const routes = Router();
const profileController = new ProfileController();

routes.use(ensureAuthenticated);

routes.get('/', profileController.show);
routes.put('/', validations.updateProfile, profileController.update);

export default routes;
