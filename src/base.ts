import {
  CookieGetOptions,
  CookieSetOptions, Data,
  StorageInterface,
  TokenConfig,
} from './interfaces';

export default class Base {
  protected defaultConfig: TokenConfig = {
    prefix: 'oauth_',
  };

  protected config: TokenConfig;

  constructor(
    protected storage: StorageInterface,
    config?: TokenConfig,
  ) {
    if (config) {
      this.setConfig(config);
    }
  }

  get(options?: CookieGetOptions): any {
    return this.storage.get(this.getName(), options);
  }

  remove(options?: CookieSetOptions): void {
    this.storage.remove(this.getName(), options);
  }

  set(value: Data, options?: CookieSetOptions): void {
    this.storage.set(this.getName(), value, options);
  }

  public setConfig(config: TokenConfig) {
    this.config = { ...this.defaultConfig, ...config };
  }

  protected getName() {
    const { prefix, name } = this.config;

    if (!prefix) {
      return name;
    }

    return `${prefix}${name}`;
  }
}
