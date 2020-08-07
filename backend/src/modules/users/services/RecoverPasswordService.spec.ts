import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeEmailProvider from '@shared/container/providers/EmailProvider/fakes/FakeEmailProvider';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepositoty';
import RecoverPasswordService from '@modules/users/services/RecoverPasswordService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeEmailProvider: FakeEmailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let recoverPasswordService: RecoverPasswordService;

describe('RecoverPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeEmailProvider = new FakeEmailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    recoverPasswordService = new RecoverPasswordService(
      fakeUserRepository,
      fakeEmailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to send user password recovery email', async () => {
    const sendEmailIsOn = jest.spyOn(fakeEmailProvider, 'sendEmail');

    const { email } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'jamilsontest@gmail.com',
      password: '123456789',
    });

    await recoverPasswordService.execute({
      email,
    });

    expect(sendEmailIsOn).toHaveBeenCalled();
  });

  it('should be able to send user password recovery email', async () => {
    await expect(
      recoverPasswordService.execute({
        email: 'emailfake@fake.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a token to forgot the password', async () => {
    const sendEmailIsOn = jest.spyOn(fakeUserTokenRepository, 'generate');

    const { id, email } = await fakeUserRepository.create({
      name: 'jamilson',
      email: 'jamilsontest@gmail.com',
      password: '123456789',
    });

    await recoverPasswordService.execute({
      email,
    });

    expect(sendEmailIsOn).toHaveBeenCalledWith(id);
  });
});
