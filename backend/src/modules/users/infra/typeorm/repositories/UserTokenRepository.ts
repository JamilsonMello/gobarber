import { Repository, getRepository } from 'typeorm';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const newUserToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(newUserToken);

    return newUserToken;
  }
}

export default UserTokenRepository;
