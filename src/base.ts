import {
  CookieGetOptions,
  CookieSetOptions, Data,
  StorageInterface,
  TokenConfig,
} from './interfaces';

export default abstract class Base {
  protected defaultConfig: TokenConfig = {
    prefix: 'oauth_',
  };

  public config: TokenConfig;

  protected constructor(
    protected storage: StorageInterface,
    // eslint-disable-next-line no-empty-function
  ) {

  }

  public get<T = Data>(options?: CookieGetOptions): Promise<T> {
    return this.storage.get<T>(this.getName(), options);
  }

  public remove(options?: CookieSetOptions): void {
    this.storage.remove(this.getName(), options);
  }

  public set<T>(value: T, options?: CookieSetOptions): Promise<T> {
    return this.storage.set<T>(this.getName(), value, options);
  }

  public setConfig(defaultConfig: TokenConfig, config?: TokenConfig) {
    if (config) {
      this.config = { ...defaultConfig, ...config };
      return;
    }
    this.config = { ...defaultConfig };
  }

  public getName(): string {
    const { prefix, name } = this.config;

    if (!prefix) {
      return name;
    }

    return `${prefix}${name}`;
  }
}
