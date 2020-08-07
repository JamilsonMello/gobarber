import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListScheduleProviderService from './ListScheduleProviderService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listScheduleProviderService: ListScheduleProviderService;

describe('ListScheduleProvider', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listScheduleProviderService = new ListScheduleProviderService(
      fakeAppointmentRepository,
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
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      day: new Date().getDate() + 1,
    });

    expect(availability).toEqual([appointment, appointment2, appointment3]);
  });
});
