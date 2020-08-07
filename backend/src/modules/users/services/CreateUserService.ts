import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserSevices {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,

    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('Email address already used');
    }

    const password_hash = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: password_hash,
    });

    return user;
  }
}

export default CreateUserSevices;
