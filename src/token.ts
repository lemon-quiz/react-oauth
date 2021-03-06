import jwt_decode from 'jwt-decode';

import Base from './base';
import {
  BaseInterface,
  CookieGetOptions,
  CookieSetOptions, Data,
  ParseTokenInterface,
  StorageInterface, TokenConfig,
} from './interfaces';

export default class Token extends Base implements BaseInterface {
  public defaultConfig: TokenConfig = {
    prefix: 'oauth_',
    name: 'token',
  };

  private parsed: ParseTokenInterface;

  constructor(protected storage: StorageInterface, config?: TokenConfig) {
    super(storage);

    this.setConfig(this.defaultConfig, config);
  }

  public set<T = Data>(value: T, options?: CookieSetOptions): Promise<T> {
    if (typeof value === 'string') {
      this.parseToken(value);
    }
    return this.storage.set<T>(this.getName(), value, options);
  }

  private parseToken(token: string): void {
    this.parsed = jwt_decode(token);
  }

  public getParsed(): any {
    return this.parsed;
  }

  public isLoaded(): boolean {
    return !!this.parsed;
  }

  public isExpired(): boolean {
    if (!this.parsed) {
      return false;
    }

    const date = new Date();
    return date.getTime() <= this.parsed.exp;
  }

  public guard(scope?: string | string[]): boolean {
    if (!this.parsed) {
      return false;
    }

    if (typeof scope === 'undefined') {
      return true;
    }

    const scopes = Array.isArray(scope) ? scope : [scope];
    const filtered = scopes.filter((item: string) => !this.parsed.scopes.includes(item));
    return filtered.length <= 0;
  }

  public async loadToken(options?: CookieGetOptions): Promise<boolean> {
    const token = await this.get(options);

    if (!token || typeof token !== 'string') {
      return false;
    }

    this.parseToken(token);

    if (this.isExpired()) {
      this.remove();
      return false;
    }

    return true;
  }
}
