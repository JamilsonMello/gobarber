import { injectable, inject } from 'tsyringe';
import { getHours, isPast } from 'date-fns';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );

    const initialHoursAvailableInDay = 8;

    const eachDayArray = Array.from(
      { length: 10 },
      (value, index) => index + initialHoursAvailableInDay,
    );

    const availability = eachDayArray.map(hour => {
      const appointmentPerHour = appointments.find(
        appointmentHour => getHours(appointmentHour.date) === hour,
      );

      return {
        hour,
        available:
          !appointmentPerHour && !isPast(new Date(year, month - 1, day, hour)),
      };
    });

    return availability;
  }
}
