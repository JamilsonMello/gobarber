import { startOfHour, isPast, isAfter, isBefore, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const providerIsValid = await this.userRepository.findById(provider_id);

    if (!providerIsValid || provider_id === user_id) {
      throw new AppError('You do not have permission');
    }

    const open = new Date(date.setHours(8, 0, 0, 0));
    const closed = new Date(date.setHours(17, 0, 0, 0));

    if (isBefore(appointmentDate, open) || isAfter(appointmentDate, closed)) {
      throw new AppError(
        'It is not possible to create schedules before 8am or after 5pm',
      );
    }

    if (isPast(date)) {
      throw new AppError(
        'It is not possible to create schedules on past dates',
      );
    }

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    const dateFomatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationRepository.create({
      content: `Novo agendamento para o dia ${dateFomatted}`,
      recipient_id: provider_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
