import Base from './base';
import { BaseInterface, StorageInterface, TokenConfig } from './interfaces';
export default class Challenge extends Base implements BaseInterface {
    protected storage: StorageInterface;
    defaultConfig: TokenConfig;
    constructor(storage: StorageInterface, config?: TokenConfig);
    generate(): Promise<string>;
}
