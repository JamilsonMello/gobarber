import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

describe('ShowProfile', () => {
  it('Should be able to show the user profile', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const showProfileService = new ShowProfileService(fakeUserRepository);

    const { id } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'emailtest@gmail.com',
      password: '123456',
    });

    const user = await showProfileService.execute({
      user_id: id,
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to show non-existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const showProfileService = new ShowProfileService(fakeUserRepository);

    await expect(
      showProfileService.execute({
        user_id: 'non-existing user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
