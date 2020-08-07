import { Router } from 'express';

import SessionController from '@modules/users/infra/controllers/SessionController';
import * as validations from '../validations/sessions.routes';

const sessionsRoutes = Router();
const sessionController = new SessionController();

sessionsRoutes.post('/', validations.sessions, sessionController.create);

export default sessionsRoutes;
