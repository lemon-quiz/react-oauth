import { CookieGetOptions, CookieSetOptions, Data, StorageInterface } from '../interfaces';
export default class StorageLocalForage implements StorageInterface {
    private instance;
    constructor(instance: LocalForage);
    set(name: string, value: Data, _options?: CookieSetOptions): void;
    get(name: string, _options?: CookieGetOptions): Promise<string>;
    remove(name: string): Promise<void>;
}
