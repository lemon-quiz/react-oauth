import forge from 'node-forge';
import { v4 } from 'uuid';
import jwt_decode from 'jwt-decode';

class Base {
    constructor(storage) {
        this.storage = storage;
        this.defaultConfig = {
            prefix: 'oauth_',
        };
    }
    get(options) {
        return this.storage.get(this.getName(), options);
    }
    remove(options) {
        this.storage.remove(this.getName(), options);
    }
    set(value, options) {
        return this.storage.set(this.getName(), value, options);
    }
    setConfig(defaultConfig, config) {
        if (config) {
            this.config = { ...defaultConfig, ...config };
            return;
        }
        this.config = { ...defaultConfig };
    }
    getName() {
        const { prefix, name } = this.config;
        if (!prefix) {
            return name;
        }
        return `${prefix}${name}`;
    }
}

class CookieUniversal {
    // eslint-disable-next-line no-empty-function
    constructor(instance) {
        this.instance = instance;
    }
    set(name, value, options) {
        this.instance.set(name, value, { path: '/', ...options });
        return Promise.resolve(value);
    }
    async get(name, options) {
        return Promise.resolve(this.instance.get(name, options));
    }
    async remove(name, options) {
        await this.instance.remove(name, { path: '/', ...options });
    }
}

class StorageLocalForage {
    // eslint-disable-next-line no-empty-function
    constructor(instance) {
        this.instance = instance;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    set(name, value, _options) {
        return this.instance.setItem(name, value);
    }
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async get(name, _options) {
        // eslint-disable-next-line no-return-await
        return await this.instance.getItem(name);
    }
    async remove(name) {
        await this.instance.removeItem(name);
    }
}

class Challenge extends Base {
    constructor(storage, config) {
        super(storage);
        this.storage = storage;
        this.defaultConfig = {
            prefix: 'oauth_',
            name: 'challenge',
        };
        this.setConfig(this.defaultConfig, config);
    }
    generate() {
        let challenge = `${v4()}${v4()}${v4()}`;
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

class Client {
    constructor(config, challenge, state) {
        this.config = config;
        this.challenge = challenge;
        this.state = state;
    }
    getConfig(key) {
        if (key) {
            return this.config[key];
        }
        return this.config;
    }
    authorize(scope) {
        if (!window) {
            throw new Error('Oauth service can only be run client side.');
        }
        const state = v4().replaceAll('-', '');
        Promise.all([
            this.challenge.generate(),
            this.state.set(state)
        ]).then(([challenge]) => {
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
            const searchParams = new URLSearchParams(params);
            window.location.href = `${authenticateUri}?${searchParams.toString()}`;
        });
    }
    async getRequestTokenData(state, code) {
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
    getRefreshTokenData(scope, token) {
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
    getRedirectUri() {
        const { redirectUri } = this.config;
        const { location: { protocol, hostname, port } } = window;
        let rUri = `${protocol}://${hostname}${redirectUri}`;
        if ((protocol === 'https:' && port !== '443') || (protocol === 'http:' && port !== '80')) {
            rUri = `${protocol}//${hostname}:${port}${redirectUri}`;
        }
        return rUri;
    }
}

class RefreshToken extends Base {
    constructor(storage, config) {
        super(storage);
        this.storage = storage;
        this.defaultConfig = {
            prefix: 'oauth_',
            name: 'refresh_token',
        };
        this.setConfig(this.defaultConfig, config);
    }
}

class State extends Base {
    constructor(storage, config) {
        super(storage);
        this.storage = storage;
        this.defaultConfig = {
            prefix: 'oauth_',
            name: 'state',
        };
        this.setConfig(this.defaultConfig, config);
    }
}

class Token extends Base {
    constructor(storage, config) {
        super(storage);
        this.storage = storage;
        this.defaultConfig = {
            prefix: 'oauth_',
            name: 'token',
        };
        this.setConfig(this.defaultConfig, config);
    }
    set(value, options) {
        if (typeof value === 'string') {
            this.parseToken(value);
        }
        return this.storage.set(this.getName(), value, options);
    }
    parseToken(token) {
        this.parsed = jwt_decode(token);
    }
    getParsed() {
        return this.parsed;
    }
    isLoaded() {
        return !!this.parsed;
    }
    isExpired() {
        if (!this.parsed) {
            return false;
        }
        const date = new Date();
        return date.getTime() <= this.parsed.exp;
    }
    guard(scope) {
        if (!this.parsed) {
            return false;
        }
        if (typeof scope === 'undefined') {
            return true;
        }
        const scopes = Array.isArray(scope) ? scope : [scope];
        const filtered = scopes.filter((item) => !this.parsed.scopes.includes(item));
        return filtered.length <= 0;
    }
    async loadToken(options) {
        const token = await this.get(options);
        if (!token || typeof token !== 'string') {
            return false;
        }
        this.parseToken(token);
        if (this.isExpired()) {
            this.remove();
            return false;
        }
        return true;
    }
}

export { Base, Challenge, Client, CookieUniversal, RefreshToken, State, StorageLocalForage, Token };
//# sourceMappingURL=index.js.map
