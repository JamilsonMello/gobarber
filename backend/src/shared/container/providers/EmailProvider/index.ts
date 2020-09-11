import { container } from 'tsyringe';

import mailConfig from '@config/mailConfig';
import IEmailProvider from './models/IEmailProvider';
import EtherealEmailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

container.registerInstance<IEmailProvider>(
    'EmailProvider',
    mailConfig.driver === 'ethereal'
      ? container.resolve(EtherealEmailProvider)
      : container.resolve(SESMailProvider),
  );
  