import Base from './base';
import { BaseInterface, TokenConfig } from './interfaces';
export default class Challenge extends Base implements BaseInterface {
    protected defaultConfig: TokenConfig;
}
