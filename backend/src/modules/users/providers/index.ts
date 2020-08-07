import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/HashProvider';

container.registerSingleton<IHashProvider>(
  'BcryptHashProvider',
  BcryptHashProvider,
);
