import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';
import CacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('ShowProfile', () => {
  it('Should be able to show the user profile', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeCacheProvider = new CacheProvider();

    const listProvidersService = new ListProvidersService(fakeUserRepository, fakeCacheProvider);

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
