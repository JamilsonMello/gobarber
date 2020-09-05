export default interface ICacheProvider {
  save(key: string, value: string): Promise<void>;
  invalidate(key: string): Promise<string>;
  recover(key: string): Promise<void>;
}