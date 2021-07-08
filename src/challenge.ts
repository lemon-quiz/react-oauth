import Base from './base';
import {
  BaseInterface,
  StorageInterface, TokenConfig,
} from './interfaces';

export default class Challenge extends Base implements BaseInterface {
  protected defaultConfig: TokenConfig = {
    prefix: 'oauth_',
    name: 'challenge',
  };
}
