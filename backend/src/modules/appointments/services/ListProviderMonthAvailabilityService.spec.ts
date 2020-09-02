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
    date.setHours(8);
    date.setMonth(date.getMonth() < 11 ? date.getMonth() + 2 : 0);
    date.getMonth() === 0 ? date.setFullYear(date.getFullYear() + 1) : null;
    date.setDate(10);
    console.log(date)

    await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setDate(date.getDate())),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setDate(date.getDate() + 1)),
      user_id: 'user',
    });

    await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setDate(date.getDate() + 1)),
      user_id: 'user',
    });

    date.setDate(15);
    date.setHours(8);

    Array.from({ length: 10 }, async (_, index) => {
      await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setHours(date.getHours() + 1)),
      user_id: 'user',
    });
    })

    

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'id-1',
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 10, available: true },
        { day: 11, available: true },
        { day: 12, available: true },
        { day: 15, available: false },
      ]),
    );
  });
});
