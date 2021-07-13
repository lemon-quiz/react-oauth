export interface CookieGetOptions {
    doNotParse?: boolean;
}
export interface CookieSetOptions {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | 'none' | 'lax' | 'strict';
    encode?: (value: string) => string;
}
export interface StorageInterface {
    get: (name: string, options?: CookieGetOptions) => any;
    set(name: string, value: Data, options?: CookieSetOptions): void;
    remove(name: string, options?: CookieSetOptions): void;
}
export interface DataInterface {
    [key: string]: any;
}
export declare type Data = DataInterface | string | number;
export interface OAuthConfigInterface {
    tokenUri: string;
    refreshUri: string;
    authenticateUri: string;
    client_id: string | number;
    redirectUri: string;
    grantType: string;
    scope: string;
}
export interface TokenConfig {
    prefix: string;
    name?: string;
}
export interface ParseTokenInterface {
    scopes: string;
    exp: number;
    [key: string]: any;
}
export interface BaseInterface {
    get(options?: CookieGetOptions): any;
    set(value: Data, options?: CookieSetOptions): void;
    remove(options?: CookieSetOptions): void;
}
