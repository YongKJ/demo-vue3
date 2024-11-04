import {Disk} from "@/common/api/pojo/po/Disk";

export class Path {

    private _name: string;
    private _path: string;
    private _size: number;
    private _sizeStr: string;
    private _ext: string;
    private _mime: string;
    private _depth: number;
    private _addTime: string;
    private _modTime: string;
    private _timestamp: number;

    public constructor(name?: string, path?: string, size?: number, sizeStr?: string, ext?: string, mime?: string, depth?: number, addTime?: string, modTime?: string, timestamp?: number) {
        this._name = name || "";
        this._path = path || "";
        this._size = size || 0;
        this._ext = ext || "";
        this._mime = mime || "";
        this._depth = depth || 0;
        this._addTime = addTime || "";
        this._modTime = modTime || "";
        this._sizeStr = sizeStr || "--";
        this._timestamp = timestamp || 0;
    }

    public static of(name: string, path: string, size: number, sizeStr: string, ext: string | undefined, mime: string | undefined, depth: number, addTime: string, modTime: string, timestamp: number): Path {
        return new Path(name, path, size, sizeStr, ext, mime, depth, addTime, modTime, timestamp);
    }

    public static getRootPath(): Path {
        return new Path("/", "/", -1, "--", "", "", 0, "", "");
    }

    public static getDiskPath(disk: Disk): Path {
        return new Path(disk.mounted, disk.mounted, -1, "--", "", "", 1, disk.addTime, disk.modTime, disk.timestamp);
    }

    get timestamp(): number {
        return this._timestamp;
    }

    set timestamp(value: number) {
        this._timestamp = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }

    get sizeStr(): string {
        return this._sizeStr;
    }

    set sizeStr(value: string) {
        this._sizeStr = value;
    }

    get ext(): string {
        return this._ext;
    }

    set ext(value: string) {
        this._ext = value;
    }

    get mime(): string {
        return this._mime;
    }

    set mime(value: string) {
        this._mime = value;
    }

    get depth(): number {
        return this._depth;
    }

    set depth(value: number) {
        this._depth = value;
    }

    get addTime(): string {
        return this._addTime;
    }

    set addTime(value: string) {
        this._addTime = value;
    }

    get modTime(): string {
        return this._modTime;
    }

    set modTime(value: string) {
        this._modTime = value;
    }
}