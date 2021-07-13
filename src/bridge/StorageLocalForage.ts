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
  public set(name: string, value: Data, _options?: CookieSetOptions): void {
    this.instance.setItem(name, value);
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async get(name: string, _options?: CookieGetOptions): Promise<string> {
    // eslint-disable-next-line no-return-await
    return await this.instance.getItem<string | null>(name);
  }

  public async remove(name: string): Promise<void> {
    await this.instance.removeItem(name);
  }
}
