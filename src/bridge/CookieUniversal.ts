import Cookies from 'universal-cookie';

import {
  CookieGetOptions,
  CookieSetOptions,
  Data,
  StorageInterface,
} from '../interfaces';

export default class CookieUniversal implements StorageInterface {
  // eslint-disable-next-line no-empty-function
  constructor(private instance: Cookies) {
  }

  public set<T = Data>(name: string, value: T, options?: CookieSetOptions): Promise<T> {
    this.instance.set(name, value, { path: '/', ...options });

    return Promise.resolve<T>(value);
  }

  public async get<T = Data>(name: string, options?: CookieGetOptions): Promise<T> {
    return Promise.resolve(this.instance.get(name, options));
  }

  public async remove(name: string, options?: CookieSetOptions): Promise<void> {
    await this.instance.remove(name, { path: '/', ...options });
  }
}
