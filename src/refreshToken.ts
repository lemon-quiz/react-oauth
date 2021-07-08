import Base from './base';
import {
  BaseInterface,
  StorageInterface, TokenConfig,
} from './interfaces';

export default class RefreshToken extends Base implements BaseInterface {
  protected defaultConfig: TokenConfig = {
    prefix: 'oauth_',
    name: 'refresh_token',
  };
}
