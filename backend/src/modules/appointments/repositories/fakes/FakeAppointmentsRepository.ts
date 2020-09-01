import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import IFindAvailabilityInMonthDTO from '@modules/appointments/dtos/IFindAvailabilityInMonthDTO';
import IFindAvailabilityInDayDTO from '@modules/appointments/dtos/IFindAvailabilityInDayDTO';
import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAvailabilityInMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAvailabilityInDayDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_id = provider_id;
    Object.assign(appointment, { id: uuid(), date, user_id, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentRepository;