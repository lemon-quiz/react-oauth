import { CookieGetOptions, CookieSetOptions, Data, StorageInterface, TokenConfig } from './interfaces';
export default abstract class Base {
    protected storage: StorageInterface;
    protected defaultConfig: TokenConfig;
    config: TokenConfig;
    protected constructor(storage: StorageInterface);
    get(options?: CookieGetOptions): Promise<any>;
    remove(options?: CookieSetOptions): void;
    set(value: Data, options?: CookieSetOptions): void;
    setConfig(defaultConfig: TokenConfig, config?: TokenConfig): void;
    getName(): string;
}
