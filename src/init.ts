import Challenge from './challenge';
import Client from './client';
import {
  InitOptionsInterface,
  OAuthConfigInterface,
  StorageInterface,
} from './interfaces';
import RefreshToken from './refreshToken';
import State from './state';
import Token from './token';

export default class Init {
  private readonly token: Token;

  private readonly refreshToken: RefreshToken;

  private readonly challenge: Challenge;

  private readonly state: State;

  private readonly client: Client;

  public constructor(
    private oAuthConfig: OAuthConfigInterface,
    private storage: StorageInterface,
    private options: InitOptionsInterface,
  ) {
    this.token = new Token(options?.token?.storage || storage, options?.token);
    this.refreshToken = new RefreshToken(options?.refreshToken?.storage || storage, options?.refreshToken);
    this.challenge = new Challenge(options?.challenge?.storage || storage, options?.challenge);
    this.state = new State(options?.state?.storage || storage, options?.state);

    this.client = new Client(this.oAuthConfig, this.challenge, this.state);
  }

  public getToken(): Token {
    return this.token;
  }

  public getRefreshToken(): RefreshToken {
    return this.refreshToken;
  }

  public getChallenge(): Challenge {
    return this.challenge;
  }

  public getState(): State {
    return this.state;
  }

  public getClient(): Client {
    return this.client;
  }
}
