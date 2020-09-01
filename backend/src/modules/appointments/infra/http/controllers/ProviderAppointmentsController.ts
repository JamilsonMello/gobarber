import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListScheduleProviderService from '@modules/appointments/services/ListScheduleProviderService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listScheduleProviderService = container.resolve(
      ListScheduleProviderService,
    );

    const appointments = await listScheduleProviderService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}