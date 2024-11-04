import {DataUtil} from "@/common/util/DataUtil";
import {LogUtil} from "@/common/util/LogUtil";
import {Log} from "@/common/pojo/dto/Log";
import {OrbitEncoder} from "orbit-encoder/lib/OrbitEncoder";
import * as DateTimeUtil from "date-fns";
import crypto from "crypto-js";
import { Path } from "../api/pojo/po/Path";
import { Global } from "../config/Global";

export class GenUtil {

    private constructor() {
    }

    public static arrayBufferToBase64(buffer: ArrayBuffer): string {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    public static base64ToArrayBuffer(base64: string): ArrayBuffer {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    public static isBrowser(): boolean {
        return typeof globalThis.window !== "undefined";
    }

    public static getRandomCode(num?: number): string {
        num = num || 6;
        let randomCode = "";
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGJKLMNPRSTUVWXYZ0123456789";
        for (let i = 0; i < num; i++) {
            let index = GenUtil.getRandom(0, chars.length);
            randomCode += chars[index];
        }
        return randomCode;
    }

    public static getRandom(n: number, m: number): number {
        return Math.floor(Math.random() * (m - n) + n);
    }

    public static checkPassword(password: string): boolean {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(password);
    }

    public static checkEmail(email: string): boolean {
        return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
    }

    public static strToDate(timeStr: string, format?: string): Date | null {
        format = format || "yyyy-MM-dd HH:mm:ss";
        if (DateTimeUtil.isValid(DateTimeUtil.parseISO(timeStr))) {
            return DateTimeUtil.parse(timeStr, format, new Date());
        }
        return null;
    }

    public static utcDateToStr(time: Date | number, format?: string): string {
        format = format || "yyyy-MM-dd HH:mm:ss";
        let dateTime = DateTimeUtil.addHours(time, 8)
        return DateTimeUtil.format(dateTime, format);
    }

    public static timestampToStr(timestamp: number): string {
        return GenUtil.dateToStr(GenUtil.strToNumber(timestamp));
    }

    public static dateToStr(time: Date | number, format?: string): string {
        format = format || "yyyy-MM-dd HH:mm:ss";
        return DateTimeUtil.format(time, format);
    }

    public static getSizeStr(size: number): string {
        if (size == -1) return "";
        let tempSize = size / 1024 / 1024 / 1024 / 1024 / 1024 / 1024;
        let sizeStr = tempSize.toFixed(2) + " EB";
        if (tempSize < 1) {
            tempSize = size / 1024 / 1024 / 1024 / 1024 / 1024;
            sizeStr = tempSize.toFixed(2) + " PB";
        }
        if (tempSize < 1) {
            tempSize = size / 1024 / 1024 / 1024 / 1024;
            sizeStr = tempSize.toFixed(2) + " TB";
        }
        if (tempSize < 1) {
            tempSize = size / 1024 / 1024 / 1024;
            sizeStr = tempSize.toFixed(2) + " GB"
        }
        if (tempSize < 1) {
            tempSize = size / 1024 / 1024;
            sizeStr = tempSize.toFixed(2) + " MB"
        }
        if (tempSize < 1) {
            tempSize = size / 1024;
            sizeStr = tempSize.toFixed(2) + " KB"
        }
        if (tempSize < 1) {
            sizeStr = size.toFixed(2) + " B"
        }
        return sizeStr;
    }

    public static checkLocalHostName(): boolean {
        let hostname = window.location.hostname;
        return Array.of(
            "build.yongkj.cn",
            "build-go.yongkj.cn",
            "win.yongkj.cn",
            "192.168.3.4",
            "192.168.50.171",
            "localhost",
            "127.0.0.1",
        ).includes(hostname);
    }

    public static getUrlHost(): string {
        let url = window.location.href;
        let index = url.lastIndexOf("/");
        return url.substring(0, index);
    }

    public static getPathsByUrl(urls: string | Array<string>, key: string): string | Array<string> {
        if (urls instanceof Array) {
            let paths = new Array<string>();
            for (let url of urls) {
                let mapData = this.getUrlParams(url);
                if (typeof mapData.get(key) === "undefined") continue;
                paths.push(mapData.get(key));
            }
            return GenUtil.getDeCode(paths);
        } else {
            let mapData = this.getUrlParams(urls);
            return typeof mapData.get(key) === "undefined" ? "" : GenUtil.getDeCode(mapData.get(key));
        }
    }

    public static getPathUrl(paths: Path | Array<Path>): string | Array<string> {
        if (paths instanceof Array) {
            let pathUrls = new Array<string>();
            for (let path of paths) {
                pathUrls.push(GenUtil.getViewUrl(path));
            }
            return pathUrls;
        } else {
            return GenUtil.getViewUrl(paths);
        }
    }
    public static getViewUrl(path: Path): string {
        return Global.BASE_URL + "/path/view?path=" + GenUtil.getEnCode(path.path);
    }

    public static getUrlParams(url: string): Map<string, any> {
        if (!url.includes("?")) return new Map<string, any>();
        url = url.split("?")[1];
        let lstData = url.split("&");
        let mapData = new Map<string, any>();
        for (let data of lstData) {
            let datas = data.split("=");
            mapData.set(datas[0], datas[1]);
        }
        return mapData;
    }

    public static getMd5Str(str: string): string {
        return crypto.MD5(str).toString().toUpperCase();
    }

    public static checkDesktop(): boolean {
        return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) == null;
    }

    public static strToList(str?: string, separator?: string): Array<string> {
        if (typeof str === "undefined" || str.length === 0) return new Array<string>();
        return str.trim().split(separator == null ? " " : separator);
    }

    public static strToString(str?: string | null): string {
        return typeof str === "string" ? str :
            (typeof str === "undefined" || str == null ? "" :
                (typeof str === "object" ? GenUtil.prettyFormat(JSON.stringify(str)) :
                    // @ts-ignore
                    (Array.isArray(str) ? GenUtil.prettyFormat(str.toString()) : str + "")));
    }

    public static prettyFormat(str: string): string {
        try {
            // 设置缩进为2个空格
            str = JSON.stringify(JSON.parse(str), null, 2);
            str = str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
                let cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return match;
            });
        } catch (e) {
            LogUtil.loggerLine(Log.of("GenUtil", "prettyFormat", "err", e));
            return "";
        }
    }

    public static listToStr(lstStr: Array<string>, separator?: string): string {
        let tempStr = "";
        lstStr.forEach(str => tempStr += str + (separator == null ? " " : separator));
        return tempStr.substring(0, tempStr.length - (separator == null ? 1 : separator.length));
    }

    public static recAddAll(recOldData: Record<string, any>, recNewData: Record<string, any>): void {
        for (let key of Object.keys(recNewData)) {
            recOldData[key] = recNewData[key];
        }
    }

    public static getEnCode(lstStr: Array<string> | string): Array<string> | string {
        if (typeof lstStr === "string") return this.getEnCodeStr(lstStr);
        let strs = new Array<string>();
        lstStr.forEach(str => strs.push(this.getEnCodeStr(str)))
        return strs;
    }

    public static getDeCode(lstStr: Array<string> | string): Array<string> | string {
        if (typeof lstStr === "string") return this.getDeCodeStr(lstStr);
        let strs = new Array<string>();
        lstStr.forEach(str => strs.push(this.getDeCodeStr(str)))
        return strs;
    }

    private static getEnCodeStr(str: string): string {
        return OrbitEncoder.encodeWithURIsafe(Buffer.from(str).toString("base64"));
    }

    private static getDeCodeStr(str: string): string {
        return Buffer.from(OrbitEncoder.decodeURIsafe(str), "base64").toString();
    }

    public static randomNum(minNum: number, maxNum: number): number {
        switch (arguments.length) {
            case 1:
                return parseInt(String(Math.random() * minNum + 1), 10);
            case 2:
                return parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10);
            default:
                return 0;
        }
    }

    public static timer(func: () => void, time: number): void {
        setTimeout(func, time);
    }

    public static createLinkTag(url: string, fileName: string): void {
        let ele = document.createElement('a');
        ele.download = fileName;
        ele.href = url;
        ele.style.display = 'none';
        document.body.appendChild(ele);
        ele.click();
        document.body.removeChild(ele);
    }

    public static sleep(waitTimeInMs: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, waitTimeInMs));
    }

    public static strToNumber(str?: string | null | number): number {
        return typeof str === "string" ? Number(str) : (typeof str === "undefined" || str == null ? 0 : str);
    }

    public static isJson<T>(obj: T): boolean {
        return typeof obj !== "undefined" && obj !== null && (<Record<string, any>>obj).constructor === {}.constructor;
    }

    public static arrayToObjList<T>(lstData: Array<Record<string, any> | Map<string, any>>, clazz: (new () => T) | T): Array<T> {
        let lstObj = new Array<T>();
        for (let data of lstData) {
            lstObj.push(
                this.isJson(data) ?
                    this.recToObj(data, clazz) :
                    this.mapToObj(<Map<string, any>>data, clazz)
            );
        }
        return lstObj;
    }

    public static mapToObj<T>(mapData: Map<string, any>, clazz: (new () => T) | T): T {
        let entity = typeof clazz === "function" ?
            new (<new () => T>clazz)() : clazz;
        let methodNames = DataUtil.getPrototypes(clazz);
        for (let methodName of methodNames) {
            entity[<keyof T>methodName] = mapData.get(methodName);
        }
        return entity;
    }

    public static recToObj<T>(recData: Record<string, any>, clazz: (new () => T) | T): T {
        let entity = typeof clazz === "function" ?
            new (<new () => T>clazz)() : clazz;
        let methodNames = DataUtil.getPrototypes(clazz);
        for (let methodName of methodNames) {
            entity[<keyof T>methodName] = recData[methodName];
        }
        return entity;
    }

    public static arrayToMapList<T>(lstObj: Array<T>): Array<Map<string, any>> {
        let lstData = new Array<Map<string, any>>();
        for (let obj of lstObj) {
            lstData.push(
                !(this.isJson(obj)) ?
                    this.objToMap(obj) :
                    this.recToMap(<any>obj)
            );
        }
        return lstData;
    }

    public static recToMap(recData: Record<string, any>): Map<string, any> {
        let mapData = new Map<string, any>();
        for (let key of Object.keys(recData)) {
            mapData.set(key, recData[key]);
        }
        return mapData;
    }

    public static objToMap<T>(obj: T): Map<string, any> {
        let mapData = new Map<string, any>();
        let methodNames = DataUtil.getPrototypes(obj);
        for (let methodName of methodNames) {
            mapData.set(methodName, obj[<keyof T>methodName]);
        }
        return mapData;
    }

    public static recToStr(record: Record<string, any> | Array<Record<string, any>>, pretty?: boolean): string {
        return typeof pretty === "undefined" ? JSON.stringify(record) : JSON.stringify(record, null, 2);
    }

    public static arrayToRecList<T>(lstObj: Array<T>): Array<Record<string, any>> {
        let lstData = new Array<Record<string, any>>();
        for (let obj of lstObj) {
            lstData.push(
                !(obj instanceof Map) ?
                    this.objToRecord(obj) :
                    this.mapToRecord(<Map<string, any>>obj)
            );
        }
        return lstData;
    }

    public static objToRecord<T>(obj: T): Record<string, any> {
        let recData: Record<string, any> = {};
        let methodNames = DataUtil.getPrototypes(obj);
        for (let methodName of methodNames) {
            recData[methodName] = obj[<keyof T>methodName];
        }
        return recData;
    }

    public static mapToRecord(mapData: Map<string, any>): Record<string, any> {
        let recData: Record<string, any> = {};
        let regStr = "^[+-]?\\d*(\\.\\d*)?(e[+-]?\\d+)?$";
        let regex = new RegExp(regStr);
        for (let [key, value] of mapData) {
            if (typeof value === "string" && value.length === 0) {
                recData[key] = value;
                continue;
            }
            recData[key] = regex.test(value) ? this.strToNumber(value) : value;
        }
        return recData;
    }

    public static strToRecord(str: string): Record<string, any> | Array<Record<string, any>> {
        return JSON.parse(str);
    }

    public static getKeys(data: Map<string, any> | Record<string, any>): Array<string> {
        if (GenUtil.isJson(data)) {
            return Object.keys(data);
        }
        let lstKey = new Array<string>();
        for (let key of data.keys()) {
            lstKey.push(key);
        }
        return lstKey;
    }

    public static getUrlKey(key: string): string | undefined {
        let url = window.location.href;
        if (url.indexOf("?") !== -1) {
            let cs_str = url.split('?')[1];
            let cs_arr = cs_str.split('&');
            let cs: Record<string, any> = {};
            for (let i = 0; i < cs_arr.length; i++) {
                cs[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1];
            }
            return (<Record<string, any>>cs)[key];
        }
        return '';
    }

    public static dataURLtoBlob(b64Data: string): Blob {
        let arr = b64Data.split(',');
        let mime = arr[0].replace("data:", "");
        return new Blob([decodeURIComponent(arr[1])], {type: mime});
    }

}