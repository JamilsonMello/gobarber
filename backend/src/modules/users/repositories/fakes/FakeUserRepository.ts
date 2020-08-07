import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IcreateUser from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProviders';

class UserRepository implements IcreateUser {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async findById(id: string): Promise<User | undefined> {
    const userFinded = this.users.find(user => user.id === id);

    return userFinded;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userEmail = this.users.find(user => user.email === email);

    return userEmail;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    user.id = uuid();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    const userIndex = this.users.findIndex(userData => userData.id === user.id);
    this.users[userIndex].avatar = user.avatar;

    return user;
  }
}

export default UserRepository;
