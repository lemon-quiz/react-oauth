import forge from 'node-forge';
import { v4 as uuidv4 } from 'uuid';

import Challenge from './challenge';
import {
  DataInterface,
  OAuthConfigInterface,
} from './interfaces';
import State from './state';

export default class Client {
  constructor(private config: OAuthConfigInterface,
              private challenge: Challenge,
              private state: State) { // eslint-disable-next-line no-empty-function
  }

  public getConfig(key?: string): string | OAuthConfigInterface {
    if (key) {
      return this.config[key];
    }

    return this.config;
  }

  public authorize(scope: string): void {
    if (!window) {
      throw new Error('Oauth service can only be run client side.');
    }

    const challenge = this.getChallenge();
    const state = uuidv4().replaceAll('-', '');
    this.state.set(state);

    const { client_id, authenticateUri } = this.config;

    const params = {
      state,
      client_id,
      scope,
      redirect_uri: this.getRedirectUri(),
      response_type: 'code',
      code_challenge: challenge,
      code_challenge_method: 'S256',
    };

    const searchParams = new URLSearchParams(params as any);

    window.location.href = `${authenticateUri as string}?${searchParams.toString()}`;
  }

  private getChallenge(): string {
    let challenge = `${(uuidv4() as string)}${(uuidv4() as string)}${(uuidv4() as string)}`;
    challenge = challenge.replaceAll('-', '');

    const md = forge.md.sha256.create();
    md.update(challenge);
    // noinspection UnnecessaryLocalVariableJS
    const code = forge.util.encode64(md.digest().data);

    const hash = code.replaceAll('+', '-')
      .replaceAll('/', '_')
      .replace(/=$/, '');

    this.challenge.set(challenge);

    return hash;
  }

  public async getRequestTokenData(state: string, code: string): Promise<DataInterface> {
    const localState = await this.state.get();
    const challenge = await this.challenge.get();

    if (localState !== state) {
      throw new Error('State do not match');
    }

    const { client_id, tokenUri } = this.config;

    return {
      uri: tokenUri,
      data: {
        code,
        client_id,
        code_verifier: challenge,
        redirect_uri: this.getRedirectUri(),
        grant_type: 'authorization_code',
      },
    };
  }

  public getRefreshTokenData(scope: string, token: string) {
    const { client_id, tokenUri } = this.config;
    return {
      uri: tokenUri,
      data: {
        client_id,
        scope,
        refresh_token: token,
        grant_type: 'refresh_token',
      },
    };
  }

  private getRedirectUri() {
    const { redirectUri } = this.config;
    const { location: { protocol, hostname, port } } = window;
    let rUri = `${protocol}://${hostname}${redirectUri}`;
    if ((protocol === 'https:' && port !== '443') || (protocol === 'http:' && port !== '80')) {
      rUri = `${protocol}//${hostname}:${port}${redirectUri}`;
    }

    return rUri;
  }
}
