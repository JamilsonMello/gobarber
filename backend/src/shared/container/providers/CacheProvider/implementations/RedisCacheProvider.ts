import Redis, { Redis as RedisType } from 'ioredis';

import ICacheProvider from '../models/ICacheProvider';
import cacheConfig from '@config/cache';

export default class RedisCacheProvider implements ICacheProvider {
  private readonly client: RedisType;
    constructor() {
      this.client = new Redis(cacheConfig.config.redis);
    }
  
  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) return null;

    const dataParsed = JSON.parse(data);

    return dataParsed;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeLine = this.client.pipeline();

    keys.forEach(key => {
      pipeLine.del(key)
    });

    await pipeLine.exec();
  }
}