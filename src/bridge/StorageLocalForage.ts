import * as LocalForage from 'localforage';

import {
  CookieGetOptions,
  CookieSetOptions,
  Data,
  StorageInterface,
} from '../interfaces';

export default class StorageLocalForage implements StorageInterface {
  // eslint-disable-next-line no-empty-function
  constructor(private instance: LocalForage) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public set<T = Data>(name: string, value: T, _options?: CookieSetOptions): Promise<T> {
    return this.instance.setItem<T>(name, value);
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async get<T = Data>(name: string, _options?: CookieGetOptions): Promise<T> {
    // eslint-disable-next-line no-return-await
    return await this.instance.getItem<T>(name);
  }

  public async remove(name: string): Promise<void> {
    await this.instance.removeItem(name);
  }
}
