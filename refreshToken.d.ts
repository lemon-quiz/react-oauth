import Base from './base';
import { BaseInterface, StorageInterface, TokenConfig } from './interfaces';
export default class RefreshToken extends Base implements BaseInterface {
    protected storage: StorageInterface;
    defaultConfig: TokenConfig;
    constructor(storage: StorageInterface, config?: TokenConfig);
}
