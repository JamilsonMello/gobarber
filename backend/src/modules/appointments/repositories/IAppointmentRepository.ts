import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAvailabilityInMonthDTO from '../dtos/IFindAvailabilityInMonthDTO';
import IFindAvailabilityInDayDTO from '../dtos/IFindAvailabilityInDayDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAvailabilityInMonthDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAvailabilityInDayDTO,
  ): Promise<Appointment[]>;
}