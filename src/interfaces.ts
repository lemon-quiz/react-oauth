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
  get<T = Data>(name: string, options?: CookieGetOptions): Promise<T>;
  set<T = Data>(name: string, value: T, options?: CookieSetOptions): Promise<T>;
  remove(name: string, options?: CookieSetOptions): void;
}

export interface DataInterface {
  [key: string]: any;
}

export type Data = DataInterface | string | number;

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
  get<T = Data>(options?: CookieGetOptions): Promise<T>;
  set<T = Data>(value: T, options?: CookieSetOptions): Promise<T>;
  remove(options?: CookieSetOptions): void;
}
