import * as LocalForage from 'localforage';

import {
  CookieGetOptions,
  CookieSetOptions,
  StorageInterface, Data,
} from '../interfaces';

export default class StorageLocalForage implements StorageInterface {
  private storage: LocalForage;

  constructor(name: string = 'local-storage') {
    this.storage = LocalForage.createInstance({
      name,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public set(name: string, value: Data, _options?: CookieSetOptions): void {
    this.storage.setItem(name, value);
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async get(name: string, _options?: CookieGetOptions): string {
    // eslint-disable-next-line no-return-await
    return await this.storage.getItem<string | null>(name);
  }

  // @ts-ignore
  public async remove(name: string): void {
    await this.storage.removeItem(name);
  }
}
