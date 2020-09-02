import 'dotenv/config';

interface IDriver {
  driver: 's3' | 'disk'
}

export default {
  driver: process.env.STORAGE_DRIVER,
} as IDriver;
