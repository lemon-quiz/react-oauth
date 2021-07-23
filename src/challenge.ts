import forge from 'node-forge';
import { v4 as uuidv4 } from 'uuid';

import Base from './base';
import {
  BaseInterface,
  StorageInterface, TokenConfig,
} from './interfaces';

export default class Challenge extends Base implements BaseInterface {
  public defaultConfig: TokenConfig = {
    prefix: 'oauth_',
    name: 'challenge',
  };

  constructor(protected storage: StorageInterface, config?: TokenConfig) {
    super(storage);

    this.setConfig(this.defaultConfig, config);
  }

  public generate(): Promise<string> {
    let challenge = `${(uuidv4() as string)}${(uuidv4() as string)}${(uuidv4() as string)}`;
    challenge = challenge.replaceAll('-', '');

    const md = forge.md.sha256.create();
    md.update(challenge);
    // noinspection UnnecessaryLocalVariableJS
    const code = forge.util.encode64(md.digest().data);

    const hash = code.replaceAll('+', '-')
      .replaceAll('/', '_')
      .replace(/=$/, '');

    this.set(challenge);

    return Promise.resolve(hash);
  }
}
