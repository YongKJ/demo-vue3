import {SocksProxyAgent} from "socks-proxy-agent";
import axios, {AxiosInstance} from "axios";
import qs from "qs";
import {LogUtil} from "@/common/util/LogUtil";
import {Log} from "@/common/pojo/dto/Log";
import {GenUtil} from "@/common/util/GenUtil";
import {DataUtil} from "@/common/util/DataUtil";
import {EventSourcePolyfill, MessageEvent} from 'event-source-polyfill';
import NProgress from 'nprogress'
import {Global} from "@/common/config/Global";
import {CommonService} from "@/common/core/CommonService";

export class ApiUtil {

    private constructor() {
    }

    private static readonly restTemplate = this.getResTemplate();

    private static getResTemplate(): AxiosInstance {
        let resTemplate = axios.create({
            timeout: 60 * 60 * 1000, // 请求超时
            httpAgent: Global.PROXY_ENABLE ? new SocksProxyAgent(Global.SOCKS_PROXY) : null
        });
        resTemplate.interceptors.request.use(config => {
            NProgress.start();
            return config;
        }, error => {
            return Promise.reject(error);
        });
        resTemplate.interceptors.response.use(response => {
            NProgress.done();
            return response;
        }, error => {
            return Promise.reject(error);
        });
        return resTemplate;
    }

    public static requestWithParamsAndConsumerFuncAndTokenByGetEvent(api: string, params: Map<string, any>, messageFunc: (evt: MessageEvent, source: EventSourcePolyfill) => void): void {
        let url = this.getUrl(api, params);
        let config = GenUtil.mapToRecord(
            this.getTokenHeader(CommonService.service.accessToken));
        let eventSource = new EventSourcePolyfill(url, config);
        eventSource.onmessage = (evt: any) => {
            if (evt.data.includes("[DONE]")) {
                eventSource.close();
                return;
            }
            messageFunc(evt, eventSource);
        };
    }

    public static requestWithParamsAndTokenByGetToEntity<T>(api: string, params: Map<string, any>, clazz: new () => T): Promise<T | Error> {
        let url = this.getUrl(api, params);
        let config = GenUtil.mapToRecord(
            this.getTokenHeader(CommonService.service.accessToken));
        return new Promise(resolve => {
            this.restTemplate.get(url, config)
                .then(res => {
                    resolve(<T>DataUtil.convertData(res.data, clazz));
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    public static requestWithParamsByPost(api: string, params: Map<string, any>): Promise<string> {
        let url = this.getUrl(api, params);
        return new Promise(resolve => {
            this.restTemplate.post(url)
                .then(res => {
                    resolve(GenUtil.recToStr(res.data));
                })
                .catch(err => {
                    LogUtil.loggerLine(Log.of("ApiUtil", "requestWithParamsByPost", "err", err.toString()));
                    resolve("");
                });
        });
    }

    public static requestWithParamsByGet(api: string, params: Map<string, any>): Promise<any | Error> {
        let url = this.getUrl(api, params);
        return new Promise(resolve => {
            this.restTemplate.get(url)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    public static requestWithParamsByGetToEntity<T>(api: string, params: Map<string, any>, clazz: new () => T): Promise<T | Error> {
        let url = this.getUrl(api, params);
        return new Promise(resolve => {
            this.restTemplate.get(url)
                .then(res => {
                    resolve(<T>DataUtil.convertData(res.data, clazz));
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    public static requestWithParamsByPostToEntity<T>(api: string, params: Map<string, any>, clazz: new () => T): Promise<T | Array<T> | Map<string, any> | Array<Map<string, any>> | Error> {
        let url = this.getUrl(api, params);
        return new Promise(resolve => {
            this.restTemplate.post(url)
                .then(res => {
                    resolve(DataUtil.convertData(res.data, clazz));
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    public static requestWithFormDataAndTokenByPostToEntity<T>(api: string, formData: FormData, clazz: new () => T): Promise<T | Error> {
        let config = GenUtil.mapToRecord(
            this.getFormConfigWithToken(CommonService.service.accessToken));
        return new Promise(resolve => {
            this.restTemplate.post(api, formData, config)
                .then(res => {
                    resolve(<T>DataUtil.convertData(res.data, clazz));
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    public static requestWithFormJsonByPostToEntity<T>(api: string, formData: FormData, clazz: new () => T): Promise<T | Error> {
        let config = GenUtil.mapToRecord(this.getJsonConfig());
        return new Promise(resolve => {
            this.restTemplate.post(api, formData, config)
                .then(res => {
                    resolve(<T>DataUtil.convertData(res.data, clazz));
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    public static requestWithFormDataByPostToEntity<T>(api: string, formData: FormData, clazz: new () => T): Promise<T | Error> {
        let config = GenUtil.mapToRecord(this.getFormConfig());
        return new Promise(resolve => {
            this.restTemplate.post(api, formData, config)
                .then(res => {
                    resolve(<T>DataUtil.convertData(res.data, clazz));
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    public static async requestWithTokenByGetToEntity<T>(api: string, clazz: new () => T): Promise<T | Error> {
        let config = GenUtil.mapToRecord(
            this.getTokenHeader(CommonService.service.accessToken));
        return await new Promise(resolve => {
            this.restTemplate.get(api, config)
                .then(res => {
                    resolve(<T>DataUtil.convertData(res.data, clazz));
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    public static async requestWithFormDataAndTokenByPost(api: string, formData: FormData): Promise<Record<string, any> | Error> {
        let config = GenUtil.mapToRecord(
            this.getFormConfigWithToken(CommonService.service.accessToken));
        return await new Promise(resolve => {
            this.restTemplate.post(api, formData, config)
                .then(res => resolve(res.data))
                .catch(err => resolve(err));
        });
    }

    public static async requestWithFormDataAndFuncAndTokenByPost(api: string, formData: FormData, thenFunc: () => void, catchFunc: (err: any) => void): Promise<void> {
        let config = GenUtil.mapToRecord(
            this.getFormConfigWithToken(CommonService.service.accessToken));
        await new Promise<void>(resolve => {
            this.restTemplate.post(api, formData, config)
                .then(() => {
                    thenFunc();
                    resolve();
                })
                .catch(err => {
                    catchFunc(err);
                    resolve();
                });
        });
    }

    public static async requestWithParamsAndConsumerFuncAndTokenByPost(api: string, formData: FormData, thenFunc: (res: Record<string, any>) => void, catchFunc: (err: any) => void): Promise<void> {
        let config = GenUtil.mapToRecord(
            this.getFormConfigWithToken(CommonService.service.accessToken));
        await new Promise<void>(resolve => {
            this.restTemplate.post(api, formData, config)
                .then(res => {
                    thenFunc(res);
                    resolve();
                })
                .catch(err => {
                    catchFunc(err);
                    resolve();
                });
        });
    }

    public static async requestWithParamsAndConsumerFuncAndTokenByGet(api: string, params: Map<string, any>, thenFunc: (res: Record<string, any>) => void, catchFunc: (err: any) => void): Promise<void> {
        let url = this.getUrlStr(api, params);
        let config = GenUtil.mapToRecord(
            this.getTokenHeader(CommonService.service.accessToken));
        await new Promise<void>(resolve => {
            this.restTemplate.get(url, config)
                .then(res => {
                    thenFunc(res);
                    resolve();
                })
                .catch(err => {
                    catchFunc(err);
                    resolve();
                });
        });
    }

    public static async requestWithParamsAndFuncAndTokenByGet(api: string, params: Map<string, any>, thenFunc: () => void, catchFunc: (err: any) => void): Promise<void> {
        let url = this.getUrlStr(api, params);
        let config = GenUtil.mapToRecord(
            this.getTokenHeader(CommonService.service.accessToken));
        await new Promise<void>(resolve => {
            this.restTemplate.get(url, config)
                .then(() => {
                    thenFunc();
                    resolve();
                })
                .catch(err => {
                    catchFunc(err);
                    resolve();
                });
        });
    }

    public static async requestWithFileAndTokenByPost(api: string, formData: FormData, progressFunc: (progress: Record<string, any>) => void, thenFunc: () => void, catchFunc: (err: any) => void): Promise<void> {
        let url = this.getUrl(api, new Map<string, any>());
        let config = GenUtil.mapToRecord(
            this.getFormDataConfigWithFuncAndToken(progressFunc, CommonService.service.accessToken));
        await new Promise<void>(resolve => {
            this.restTemplate.post(url, formData, config)
                .then(() => {
                    thenFunc();
                    resolve();
                })
                .catch(err => {
                    catchFunc(err);
                    resolve();
                });
        });
    }

    public static requestWithDataByPost(api: string, params: FormData): Promise<object | Error> {
        let url = this.getUrl(api, new Map<string, any>());
        let config = GenUtil.mapToRecord(this.getFormDataConfig());
        return new Promise(resolve => {
            this.restTemplate.post(url, params, config)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    public static requestWithFileAndTokenByPostToEntity<T>(api: string, params: FormData, clazz: new () => T): Promise<T | Error> {
        let config = GenUtil.mapToRecord(
            this.getFormDataConfigWithToken(CommonService.service.accessToken));
        return new Promise(resolve => {
            this.restTemplate.post(api, params, config)
                .then(res => {
                    resolve(<T>DataUtil.convertData(res.data, clazz));
                })
                .catch(err => {
                    resolve(err);
                });
        });
    }

    private static getFormConfigWithToken(accessToken: string | null): Map<string, any> {
        let header: Record<string, any> = {};
        header['Content-Type'] = 'application/x-www-form-urlencoded';
        if (accessToken != null) {
            GenUtil.recAddAll(header, this.getTokenInfo(accessToken));
        }
        return this.getMapConfig(header);
    }

    private static getJsonConfig(): Map<string, any> {
        let header: Record<string, any> = {};
        header['Content-Type'] = 'application/json';
        header['token'] = 'temp_token:login';
        return this.getMapConfig(header);
    }

    private static getFormConfig(): Map<string, any> {
        let header: Record<string, any> = {};
        header['Content-Type'] = 'application/x-www-form-urlencoded';
        return this.getMapConfig(header);
    }

    private static getFormDataConfigWithFuncAndToken(progressFunc: (progress: Record<string, any>,) => void, accessToken: string | null): Map<string, any> {
        let header: Record<string, any> = {};
        header['Content-Type'] = 'multipart/form-data';
        if (accessToken != null) {
            GenUtil.recAddAll(header, this.getTokenInfo(accessToken));
        }
        let mapConfig = this.getMapConfig(header);
        mapConfig.set("onUploadProgress", progressFunc);
        return mapConfig;
    }

    private static getFormDataConfigWithToken(accessToken: string | null): Map<string, any> {
        let header: Record<string, any> = {};
        header['Content-Type'] = 'multipart/form-data;charset=utf-8';
        if (accessToken != null) {
            GenUtil.recAddAll(header, this.getTokenInfo(accessToken));
        }
        return this.getMapConfig(header);
    }

    private static getFormDataConfig(): Map<string, any> {
        let header: Record<string, any> = {};
        header['Content-Type'] = 'multipart/form-data;charset=utf-8';
        return this.getMapConfig(header);
    }

    private static getTokenHeader(accessToken: string | null): Map<string, any> {
        return this.getMapConfig(this.getTokenInfo(accessToken));
    }

    private static getTokenInfo(accessToken: string | null): Record<string, any> {
        let recToken: Record<string, any> = {};
        if (accessToken != null) {
            recToken['Authorization'] = 'Bearer ' + accessToken;
        }
        return recToken;
    }

    private static getMapConfig(recHeader: Record<string, any>): Map<string, any> {
        return new Map<string, any>([
            ["headers", recHeader]
        ]);
    }

    public static getUrlStr(api: string, params: Map<string, any>): string {
        let url = (api.includes("http") ? "" : "http://") + api;
        for (let [key, value] of params) {
            url += (url.includes("?") ? "&" : "?") + key + "=" + value;
        }
        LogUtil.loggerLine(Log.of("ApiUtil", "getUrlStr", "url", url));
        return url;
    }

    public static getUrl(api: string, params: Map<string, any>): string {
        let apiParams = qs.stringify(GenUtil.mapToRecord(params));
        if (api.includes("http")) {
            let url = api + "?" + apiParams;
            LogUtil.loggerLine(Log.of("ApiUtil", "getUrl", "url", url));
            return url;
        }
        let url = "http://" + Global.HOST + api + "?" + apiParams;
        LogUtil.loggerLine(Log.of("ApiUtil", "getUrl", "url", url));
        return url;
    }

}