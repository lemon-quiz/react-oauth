import { CookieGetOptions, CookieSetOptions, StorageInterface, Data } from '../interfaces';
export default class StorageLocalForage implements StorageInterface {
    private storage;
    constructor(name?: string);
    set(name: string, value: Data, _options?: CookieSetOptions): void;
    get(name: string, _options?: CookieGetOptions): string;
    remove(name: string): void;
}
