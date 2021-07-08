import Cookies from 'universal-cookie';

import {
  CookieGetOptions,
  CookieSetOptions,
  StorageInterface,
  Data,
} from '../interfaces';

export default class CookieUniversal implements StorageInterface {
  private cookies: Cookies;

  constructor() {
    this.cookies = new Cookies();
  }

  public set(name: string, value: Data, options?: CookieSetOptions): void {
    this.cookies.set(name, value, { path: '/', ...options });
  }

  public get(name: string, options?: CookieGetOptions): string {
    return this.cookies.get(name, options);
  }

  public remove(name: string, options?: CookieSetOptions): void {
    this.cookies.remove(name, { path: '/', ...options });
  }
}
