import { CookieGetOptions, CookieSetOptions, Data, StorageInterface } from '../interfaces';
export default class StorageLocalForage implements StorageInterface {
    private instance;
    constructor(instance: LocalForage);
    set<T = Data>(name: string, value: T, _options?: CookieSetOptions): Promise<T>;
    get<T = Data>(name: string, _options?: CookieGetOptions): Promise<T>;
    remove(name: string): Promise<void>;
}
