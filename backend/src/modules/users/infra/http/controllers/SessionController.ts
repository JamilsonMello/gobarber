import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const reateSessionService = container.resolve(CreateSessionService);

    const { user, token } = await reateSessionService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}