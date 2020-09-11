import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeBcryptHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('Create new user', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeBcryptHashProvider = new FakeBcryptHashProvider();
    const fakeCacheProvider = new FakeCacheProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeBcryptHashProvider,
      fakeCacheProvider,
    );

    const user = await createUserService.execute({
      name: 'jamilson',
      email: 'jamilsontest@gmail.com',
      password: '123456789',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user if it already exists', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeBcryptHashProvider = new FakeBcryptHashProvider();
    const fakeCacheProvider = new FakeCacheProvider();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeBcryptHashProvider,
      fakeCacheProvider,
    );

    await createUserService.execute({
      name: 'jamilson',
      email: 'jamilsontest@gmail.com',
      password: '123456789',
    });

    await expect(
      createUserService.execute({
        name: 'jamilson',
        email: 'jamilsontest@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
