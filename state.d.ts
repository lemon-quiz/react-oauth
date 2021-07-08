import Base from './base';
import { BaseInterface, TokenConfig } from './interfaces';
export default class State extends Base implements BaseInterface {
    protected defaultConfig: TokenConfig;
}
