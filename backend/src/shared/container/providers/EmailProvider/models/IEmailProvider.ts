import ISendEmailDTO from '../dtos/ISendMailDTO';

export default interface IEmailProvider {
  sendEmail(data: ISendEmailDTO): Promise<void>;
}
