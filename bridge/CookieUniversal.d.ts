import { CookieGetOptions, CookieSetOptions, StorageInterface, Data } from '../interfaces';
export default class CookieUniversal implements StorageInterface {
    private cookies;
    constructor();
    set(name: string, value: Data, options?: CookieSetOptions): void;
    get(name: string, options?: CookieGetOptions): string;
    remove(name: string, options?: CookieSetOptions): void;
}
