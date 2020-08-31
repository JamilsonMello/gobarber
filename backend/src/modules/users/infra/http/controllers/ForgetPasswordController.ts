import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RecoverPasswordEmailService from '@modules/users/services/RecoverPasswordService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const recoverPasswordEmail = container.resolve(
        RecoverPasswordEmailService,
    );

    await recoverPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}