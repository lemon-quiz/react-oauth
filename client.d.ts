import Challenge from './challenge';
import { DataInterface, OAuthConfigInterface } from './interfaces';
import State from './state';
export default class Client {
    private config;
    private challenge;
    private state;
    constructor(config: OAuthConfigInterface, challenge: Challenge, state: State);
    authorize(scope: string): void;
    private getChallenge;
    getRequestTokenData(state: string, code: string): DataInterface;
    private getRedirectUri;
}
