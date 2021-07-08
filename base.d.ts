import { CookieGetOptions, CookieSetOptions, Data, StorageInterface, TokenConfig } from './interfaces';
export default class Base {
    protected storage: StorageInterface;
    protected defaultConfig: TokenConfig;
    protected config: TokenConfig;
    constructor(storage: StorageInterface, config?: TokenConfig);
    get(options?: CookieGetOptions): any;
    remove(options?: CookieSetOptions): void;
    set(value: Data, options?: CookieSetOptions): void;
    setConfig(config: TokenConfig): void;
    protected getName(): string;
}
