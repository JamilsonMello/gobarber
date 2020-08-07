import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepositoty';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset the userPassword', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const { id } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'jamilsontest@gmail.com',
      password: '123456789',
    });

    const { token } = await fakeUserTokenRepository.generate(id);

    await resetPasswordService.execute({ token, password: '123123' });

    const user = await fakeUserRepository.findById(id);

    expect(user?.password).toEqual('123123');
    expect(generateHash).toHaveBeenCalledWith('123123');
  });

  it('Should not be able to reset the password with invalid token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'invalid-token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'non-existing user',
    );
    await expect(
      resetPasswordService.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password if passed more than 2 hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    const { id } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'jamilsontest@email.com',
      password: '123456789',
    });

    const { token } = await fakeUserTokenRepository.generate(id);

    await expect(
      resetPasswordService.execute({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
