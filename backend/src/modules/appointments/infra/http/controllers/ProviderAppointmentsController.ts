import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListScheduleProviderService from '@modules/appointments/services/ListScheduleProviderService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listScheduleProviderService = container.resolve(
      ListScheduleProviderService,
    );

    const appointments = await listScheduleProviderService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}