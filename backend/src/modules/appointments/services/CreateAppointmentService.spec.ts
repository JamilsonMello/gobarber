import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeUserRepository: FakeUserRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let createAppointmentService: CreateAppointmentService;
let date: Date;

describe('CreateAppointment', () => {
  beforeEach(() => {
    date = new Date(Date.now());
    date.setDate(date.getDate() + 1);

    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeUserRepository,
      fakeNotificationRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'provider',
      email: 'emailprovider@mail.com',
      password: 'password',
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(date.setHours(8)),
      provider_id: id,
      user_id: 'user',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a appointment in the same time', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'provider',
      email: 'emailprovider@mail.com',
      password: 'password',
    });

    await createAppointmentService.execute({
      date: new Date(date.setHours(8)),
      provider_id: id,
      user_id: 'user',
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(date),
        provider_id: id,
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with provider non-existing', async () => {
    await expect(
      createAppointmentService.execute({
        date: new Date(date.setHours(8)),
        provider_id: 'non-existing provider',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment at a past date', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'provider',
      email: 'emailprovider@mail.com',
      password: 'password',
    });

    const user = await fakeUserRepository.create({
      name: 'user',
      email: 'emailuser@mail.com',
      password: 'password',
    });

    date.setHours(10);
    date.setDate(date.getDate() - 2);

    await expect(
      createAppointmentService.execute({
        date: new Date(date),
        provider_id: id,
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'provider',
      email: 'emailprovider@mail.com',
      password: 'password',
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(date.setHours(8)),
        provider_id: id,
        user_id: id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    const { id } = await fakeUserRepository.create({
      name: 'provider',
      email: 'emailprovider@mail.com',
      password: 'password',
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(date.setHours(7)),
        provider_id: id,
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(date.setHours(19)),
        provider_id: id,
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
