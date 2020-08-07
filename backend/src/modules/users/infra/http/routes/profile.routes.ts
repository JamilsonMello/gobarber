import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateProfileController from '../../controllers/ProfileController';
import * as validations from '../validations/profile.routes';

const routes = Router();
const updateProfileController = new UpdateProfileController();

routes.use(ensureAuthenticated);

routes.get('/', updateProfileController.show);
routes.put('/', validations.updateProfile, updateProfileController.update);

export default routes;
