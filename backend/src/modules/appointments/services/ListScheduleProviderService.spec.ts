import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListScheduleProviderService from './ListScheduleProviderService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listScheduleProviderService: ListScheduleProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListScheduleProvider', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listScheduleProviderService = new ListScheduleProviderService(
      fakeAppointmentRepository,
      fakeCacheProvider,
    );
  });

  it('Should be able to list schedule from provider ', async () => {
    const date = new Date(Date.now());
    date.setDate(date.getDate() + 1);

    const appointment = await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setHours(8)),
      user_id: 'user',
    });

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setHours(9)),
      user_id: 'user',
    });

    const appointment3 = await fakeAppointmentRepository.create({
      provider_id: 'id-1',
      date: new Date(date.setHours(10)),
      user_id: 'user',
    });

    const availability = await listScheduleProviderService.execute({
      provider_id: 'id-1',
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      day: date.getDate(),
    });

    expect(availability).toEqual([appointment, appointment2, appointment3]);
  });
});
