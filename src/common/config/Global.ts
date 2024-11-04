export class Global {

    private static _SOCKS_PROXY = "";
    private static _PROXY_ENABLE = false;
    private static _BASE_URL = "https://server.yongkj.cn";

    private static readonly _LOG_ENABLE = true;
    private static readonly _HOST = "localhost:30056";

    static get BASE_URL(): string {
        return this._BASE_URL;
    }

    static get LOG_ENABLE(): boolean {
        return this._LOG_ENABLE;
    }

    static get PROXY_ENABLE(): boolean {
        return this._PROXY_ENABLE;
    }

    static get SOCKS_PROXY(): string {
        return this._SOCKS_PROXY;
    }

    static get HOST(): string {
        return this._HOST;
    }

}