import Challenge from './challenge';
import { DataInterface, OAuthConfigInterface } from './interfaces';
import State from './state';
export default class Client {
    private config;
    private challenge;
    private state;
    constructor(config: OAuthConfigInterface, challenge: Challenge, state: State);
    getConfig(key?: string): string | OAuthConfigInterface;
    authorize(scope: string): void;
    getRequestTokenData(state: string, code: string): Promise<DataInterface>;
    getRefreshTokenData(scope: string, token: string): {
        uri: string;
        data: {
            client_id: string | number;
            scope: string;
            refresh_token: string;
            grant_type: string;
        };
    };
    private getRedirectUri;
}
