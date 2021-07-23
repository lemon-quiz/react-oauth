import Cookies from 'universal-cookie';
import { CookieGetOptions, CookieSetOptions, Data, StorageInterface } from '../interfaces';
export default class CookieUniversal implements StorageInterface {
    private instance;
    constructor(instance: Cookies);
    set<T = Data>(name: string, value: T, options?: CookieSetOptions): Promise<T>;
    get<T = Data>(name: string, options?: CookieGetOptions): Promise<T>;
    remove(name: string, options?: CookieSetOptions): Promise<void>;
}
