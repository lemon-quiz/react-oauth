import Challenge from '../src/challenge';
import Client from '../src/client';
import { OAuthConfigInterface, StorageInterface } from '../src/interfaces';
import RefreshToken from '../src/refreshToken';
import State from '../src/state';
import Token from '../src/token';

export default class OAuthService {
  private oAuthConfig: OAuthConfigInterface = {
    tokenUri: 'http://localhost:3010/api/oauth/token',
    refreshUri: '',
    authenticateUri: 'http://localhost:3010/authorize',
    client_id: 7,
    redirectUri: '/authorize',
    grantType: 'authorization_code',
    scope: '',
  };

  private token: Token;

  private challenge: Challenge;

  private refreshToken: RefreshToken;

  private state: State;

  private client: Client;

  constructor(
    private api: any,
    private cookiesStorage: StorageInterface,
    private localStorage: StorageInterface,
    private config: OAuthConfigInterface,
  ) {
    this.token = new Token(cookiesStorage);
    this.challenge = new Challenge(localStorage);
    this.state = new State(localStorage);
    this.refreshToken = new RefreshToken(localStorage);
    this.client = new Client(this.oAuthConfig, this.challenge, this.state);
  }

  public authenticate() {
    this.client.authorize(this.config.scope);
  }

  public requestToken(state: string, code: string) {
    const { uri, data } = this.client.getRequestTokenData(state, code);

    this.api.post(uri, data).subscribe({
      next: ({ access_token, refresh_token }) => {
        this.token.set(access_token);
        this.refreshToken.set(refresh_token);
      },
      error: (error) => {
        // show error
        throw new Error(error);
      },
    });
  }

  public guard(scope?: string | string[]): true | 401 | 403 | 498 {
    if (!this.token.isLoaded()) {
      // 401 Unauthorized
      return 401;
    }

    if (this.token.isExpired()) {
      // 498 Token expired
      return 498;
    }

    if (!this.token.guard(scope)) {
      // 403 Access denied
      return 403;
    }

    return true;
  }
}
