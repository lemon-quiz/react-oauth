import Challenge from './challenge';
import Client from './client';
import { InitOptionsInterface, OAuthConfigInterface, StorageInterface } from './interfaces';
import RefreshToken from './refreshToken';
import State from './state';
import Token from './token';
export default class Init {
    private oAuthConfig;
    private storage;
    private options;
    private readonly token;
    private readonly refreshToken;
    private readonly challenge;
    private readonly state;
    private readonly client;
    constructor(oAuthConfig: OAuthConfigInterface, storage: StorageInterface, options: InitOptionsInterface);
    getToken(): Token;
    getRefreshToken(): RefreshToken;
    getChallenge(): Challenge;
    getState(): State;
    getClient(): Client;
}
