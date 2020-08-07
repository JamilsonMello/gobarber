import { injectable, inject } from 'tsyringe';
import { resolve } from 'path';

import IEmailProvider from '@shared/container/providers/EmailProvider/models/IEmailProvider';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import AppError from '@shared/errors/AppError';
import directory from '@config/templates';

interface IRequest {
  email: string;
}

@injectable()
class RecoverPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepositoty: IUserRepository,

    @inject('EmailProvider')
    private emailProvider: IEmailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepositoty.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const templatePassword = resolve(
      directory.templates,
      'users',
      'view',
      'templates',
      'recovery_password.hbs',
    );

    await this.emailProvider.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Gobarber] Recuperação de senha',
      templateData: {
        template: templatePassword,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default RecoverPasswordService;
