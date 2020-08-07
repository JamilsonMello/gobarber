import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeBcryptHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

describe('CreateSession', () => {
  it('should be able create session to user', async () => {
    const fakeBcryptHashProvider = new FakeBcryptHashProvider();
    const fakeUserRepository = new FakeUserRepository();

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeBcryptHashProvider,
    );

    await createUserService.execute({
      name: 'jamilson',
      email: 'jamilsontest@gmail.com',
      password: '123456789',
    });

    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeBcryptHashProvider,
    );

    const { user, token } = await createSessionService.execute({
      email: 'jamilsontest@gmail.com',
      password: '123456789',
    });

    expect(user).toHaveProperty('id');
    expect(token).toBeTruthy();
  });

  it('should not be able to authenticate with a non-existent user', async () => {
    const fakeBcryptHashProvider = new FakeBcryptHashProvider();
    const fakeUserRepository = new FakeUserRepository();

    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeBcryptHashProvider,
    );

    await expect(
      createSessionService.execute({
        email: 'jamilsontest2@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeBcryptHashProvider = new FakeBcryptHashProvider();
    const fakeUserRepository = new FakeUserRepository();

    const createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeBcryptHashProvider,
    );

    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeBcryptHashProvider,
    );

    await createUserService.execute({
      name: 'jamilson',
      email: 'jamilsontest@gmail.com',
      password: '123456789',
    });

    await expect(
      createSessionService.execute({
        email: 'jamilsontest@gmail.com',
        password: '12345678910',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
