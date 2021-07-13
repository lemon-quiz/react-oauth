import Cookies from 'universal-cookie';
import { CookieGetOptions, CookieSetOptions, Data, StorageInterface } from '../interfaces';
export default class CookieUniversal implements StorageInterface {
    private instance;
    constructor(instance: Cookies);
    set(name: string, value: Data, options?: CookieSetOptions): void;
    get(name: string, options?: CookieGetOptions): Promise<string>;
    remove(name: string, options?: CookieSetOptions): Promise<void>;
}
