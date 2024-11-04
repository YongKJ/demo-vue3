export class Disk {

    private _fileSystem: string;
    private _blocks: number;
    private _blocksStr: string;
    private _used: number;
    private _usedStr: string;
    private _available: number;
    private _availableStr: string;
    private _capacity: string;
    private _mounted: string;
    private _addTime: string;
    private _modTime: string;
    private _timestamp: number;

    public constructor(fileSystem?: string, blocks?: number, blocksStr?: string, used?: number, usedStr?: string, available?: number, availableStr?: string, capacity?: string, mounted?: string, addTime?: string, modTime?: string, timestamp?: number) {
        this._fileSystem = fileSystem || "";
        this._blocks = blocks || 0;
        this._blocksStr = blocksStr || "";
        this._used = used || 0;
        this._usedStr = usedStr || "";
        this._available = available || 0;
        this._availableStr = availableStr || "";
        this._capacity = capacity || "";
        this._mounted = mounted || "";
        this._addTime = addTime || "";
        this._modTime = modTime || "";
        this._timestamp = timestamp || 0;
    }

    public static of(fileSystem: string, blocks: number, blocksStr: string, used: number, usedStr: string, available: number, availableStr: string, capacity: string, mounted: string, addTime: string, modTime: string, timestamp: number) {
        return new Disk(fileSystem, blocks, blocksStr, used, usedStr, available, availableStr, capacity, mounted, addTime, modTime, timestamp);
    }

    get timestamp(): number {
        return this._timestamp;
    }

    set timestamp(value: number) {
        this._timestamp = value;
    }

    get fileSystem(): string {
        return this._fileSystem;
    }

    set fileSystem(value: string) {
        this._fileSystem = value;
    }

    get blocks(): number {
        return this._blocks;
    }

    set blocks(value: number) {
        this._blocks = value;
    }

    get blocksStr(): string {
        return this._blocksStr;
    }

    set blocksStr(value: string) {
        this._blocksStr = value;
    }

    get used(): number {
        return this._used;
    }

    set used(value: number) {
        this._used = value;
    }

    get usedStr(): string {
        return this._usedStr;
    }

    set usedStr(value: string) {
        this._usedStr = value;
    }

    get available(): number {
        return this._available;
    }

    set available(value: number) {
        this._available = value;
    }

    get availableStr(): string {
        return this._availableStr;
    }

    set availableStr(value: string) {
        this._availableStr = value;
    }

    get capacity(): string {
        return this._capacity;
    }

    set capacity(value: string) {
        this._capacity = value;
    }

    get mounted(): string {
        return this._mounted;
    }

    set mounted(value: string) {
        this._mounted = value;
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