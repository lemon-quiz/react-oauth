import Base from './base';
import { BaseInterface, CookieGetOptions, CookieSetOptions, Data, StorageInterface, TokenConfig } from './interfaces';
export default class Token extends Base implements BaseInterface {
    protected storage: StorageInterface;
    defaultConfig: TokenConfig;
    private parsed;
    constructor(storage: StorageInterface, config?: TokenConfig);
    set<T = Data>(value: T, options?: CookieSetOptions): Promise<T>;
    private parseToken;
    getParsed(): any;
    isLoaded(): boolean;
    isExpired(): boolean;
    guard(scope?: string | string[]): boolean;
    loadToken(options?: CookieGetOptions): Promise<boolean>;
}
