import './CacheProvider';
import './MailTemplateProvider';

import { container } from 'tsyringe';

import mailConfig from '@config/mailConfig';
import storageConfig from '@config/storageConfig';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';

import IEmailProvider from './EmailProvider/models/IEmailProvider';
import EtherealEmailProvider from './EmailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './EmailProvider/implementations/SESMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageConfig.driver === 'disk' ? DiskStorageProvider : S3StorageProvider,
);

container.registerInstance<IEmailProvider>(
  'EmailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealEmailProvider)
    : container.resolve(SESMailProvider),
);
