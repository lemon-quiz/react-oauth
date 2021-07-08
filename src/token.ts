import jwt_decode from 'jwt-decode';

import Base from './base';
import {
  BaseInterface,
  CookieGetOptions,
  CookieSetOptions,
  ParseTokenInterface,
  StorageInterface, TokenConfig,
} from './interfaces';

export default class Token extends Base implements BaseInterface {
  protected defaultConfig: TokenConfig = {
    prefix: 'oauth_',
    name: 'token',
  };

  private parsed: ParseTokenInterface;

  constructor(storage: StorageInterface, config?: TokenConfig) {
    super(storage, config);
  }

  public set(token: string, options?: CookieSetOptions): void {
    this.storage.set(this.getName(), token, options);
    this.parseToken(token);
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

  public loadToken(options?: CookieGetOptions): boolean {
    const token = this.get(options);

    if (!token) {
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
