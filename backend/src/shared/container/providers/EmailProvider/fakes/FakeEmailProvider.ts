import IEmailProvider from '../models/IEmailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

class FakeEmailProvider implements IEmailProvider {
  private emailReceived: ISendMailDTO[] = [];

  public async sendEmail(message: ISendMailDTO): Promise<void> {
    this.emailReceived.push(message);
  }
}

export default FakeEmailProvider;
