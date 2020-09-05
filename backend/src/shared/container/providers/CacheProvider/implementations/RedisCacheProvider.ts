import Redis, { Redis as RedisType } from 'ioredis';

import ICacheProvider from '../models/ICacheProvider';
import cacheConfig from '@config/cache';

export default class RedisCacheProvider implements ICacheProvider {
  private readonly client: RedisType;
    constructor() {
      this.client = new Redis(cacheConfig.config.redis);
    }
  
  async save(key: string, value: string): Promise<void> {}

  async invalidate(key: string): Promise<string> {}

  async recover(key: string): Promise<void> {}
}