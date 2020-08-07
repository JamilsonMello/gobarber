import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import UpdateAvatarUserService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

describe('UpdateAvatarUser', () => {
  it('should be able to update user avatar', async () => {
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();
    const fakeUserRepository = new FakeUserRepository();

    const updateAvatarUserService = new UpdateAvatarUserService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    const { id, avatar } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'jamilsontest@gmail.com',
      password: '123456789',
    });

    const user = await updateAvatarUserService.execute({
      user_id: id,
      avatarFilename: avatar,
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to deny access to the unauthenticated user', async () => {
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();
    const fakeUserRepository = new FakeUserRepository();

    const updateAvatarUserService = new UpdateAvatarUserService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    await expect(
      updateAvatarUserService.execute({
        user_id: '12121212',
        avatarFilename: 'profile.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete the image before, if the user is image already exists', async () => {
    const fakeDiskStorageProvider = new FakeDiskStorageProvider();
    const fakeUserRepository = new FakeUserRepository();

    const updateAvatarUserService = new UpdateAvatarUserService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    const deleleFileIsOn = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

    const { id } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'jamilsontest@gmail.com',
      password: '123456789',
    });

    await updateAvatarUserService.execute({
      user_id: id,
      avatarFilename: 'profile.jpg',
    });

    const { avatar } = await updateAvatarUserService.execute({
      user_id: id,
      avatarFilename: 'profile2.jpg',
    });

    expect(deleleFileIsOn).toHaveBeenCalledWith('profile.jpg');
    expect(avatar).toEqual('profile2.jpg');
  });
});
