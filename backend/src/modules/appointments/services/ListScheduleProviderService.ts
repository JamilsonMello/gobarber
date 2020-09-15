import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';


interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
export default class ListScheduleProviderService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
    
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

    if (!appointments) {
      appointments = await this.appointmentRepository.findAllInDayFromProvider(
        {
          provider_id,
          month,
          year,
          day,
        },
      );
    }

    await this.cacheProvider.save(cacheKey, classToClass(appointments));

    return appointments;
  }
}
