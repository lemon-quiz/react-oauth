import { CookieGetOptions, CookieSetOptions, Data, StorageInterface, TokenConfig } from './interfaces';
export default abstract class Base {
    protected storage: StorageInterface;
    protected defaultConfig: TokenConfig;
    config: TokenConfig;
    protected constructor(storage: StorageInterface);
    get<T = Data>(options?: CookieGetOptions): Promise<T>;
    remove(options?: CookieSetOptions): void;
    set<T>(value: T, options?: CookieSetOptions): Promise<T>;
    setConfig(defaultConfig: TokenConfig, config?: TokenConfig): void;
    getName(): string;
}
