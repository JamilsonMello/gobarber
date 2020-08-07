import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepositoty: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('you do not have permission', 401);
    }

    const user = await this.userRepositoty.findById(userToken.user_id);

    if (!user) {
      throw new AppError('you do not have permission', 401);
    }

    const today = Date.now();

    if (differenceInHours(today, userToken.created_at) > 2) {
      throw new AppError('Invalid token');
    }
    user.password = await this.hashProvider.generateHash(password);

    await this.userRepositoty.update(user);
  }
}

export default ResetPasswordService;
