import Base from './base';
import {
  BaseInterface, StorageInterface,
  TokenConfig,
} from './interfaces';

export default class State extends Base implements BaseInterface {
  public defaultConfig: TokenConfig = {
    prefix: 'oauth_',
    name: 'state',
  };

  constructor(protected storage: StorageInterface, config?: TokenConfig) {
    super(storage);

    this.setConfig(this.defaultConfig, config);
  }
}
