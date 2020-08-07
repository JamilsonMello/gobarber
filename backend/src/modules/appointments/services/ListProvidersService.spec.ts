import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

describe('ShowProfile', () => {
  it('Should be able to show the user profile', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const listProvidersService = new ListProvidersService(fakeUserRepository);

    const user1 = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'emailtest@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'jamilson2',
      email: 'emailtest2@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'jamilson3',
      email: 'emailtest3@gmail.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
