import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('Should be able to list the month availability from provider ', async () => {
    const date = new Date(Date.now());
    date.setDate(date.getDate() + 1);
    date.setHours(8);

    await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setHours(9)),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setDate(date.getDate() - 2)),
      user_id: 'user',
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'id-1',
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: date.getDate() + 2, available: true },
        { day: date.getDate() + 3, available: true },
        { day: date.getDate() - 3, available: false },
      ]),
    );
  });
});
