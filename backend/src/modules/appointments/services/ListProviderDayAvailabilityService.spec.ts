import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('Should be able to list the day availability from provider ', async () => {
    const date = new Date(Date.now());
    date.setDate(date.getDate() + 1);

    await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setHours(8)),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setHours(9)),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setHours(10)),
      user_id: 'user',
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'id-1',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      day: new Date().getDate() + 1,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: true },
        { hour: 12, available: true },
      ]),
    );
  });
});
