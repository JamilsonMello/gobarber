import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update user profile', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'emailtest@email.com',
      password: '123456',
    });

    const user = await updateProfileService.execute({
      user_id: id,
      name: 'update name',
      email: 'update@email.com',
      password: '123123',
      old_password: '123456',
    });

    const userUpdated = await fakeUserRepository.findById(id);

    expect(user).toBe(userUpdated);
  });

  it('Should not be able to update non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing user',
        name: 'test',
        email: 'test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the email for the existing email', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'emailtest@email.com',
      password: '123456',
    });

    await fakeUserRepository.create({
      name: 'jamilson',
      email: 'emailtestupdate@email.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: id,
        name: 'jamilson',
        email: 'emailtestupdate@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password without oldPassword', async () => {
    const { id, name, email } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'emailtest@email.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: id,
        name,
        email,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password if the old password does not match', async () => {
    const { id, name, email } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'emailtest@email.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: id,
        name,
        email,
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
