import {BaseService} from "@/common/core/BaseService";
import EventEmitter2 from "eventemitter2";
import {ComponentPublicInstance} from "vue";
import {Class} from "@/common/pojo/enum/Class";
import {GeneralService} from "@/common/core/GeneralService";

export abstract class CommonService<U> extends GeneralService implements BaseService<U> {

    private readonly _vue: ComponentPublicInstance;
    public static service: CommonService<any>;
    private static readonly _emitter = new EventEmitter2();
    private static readonly mapVue = new Map<string, ComponentPublicInstance>();

    protected constructor(vue: ComponentPublicInstance) {
        super();
        this._vue = vue;
        if (CommonService.mapVue.size === 0) CommonService.service = this;
        CommonService.mapVue.set(this.getServiceName() + (this.getProp("index") || 0), this.vue);
    }

    private getVue(name: string, index?: number): ComponentPublicInstance {
        index = index || (name === this.getServiceName() ? (this.getProp("index") || 0) : 0);
        return <ComponentPublicInstance>CommonService.mapVue.get(name + index);
    }

    private getServiceName(className?: string): string {
        if (typeof className === "undefined") {
            className = this.getClassName();
        }
        return className[0].toLowerCase() + className.substring(1);
    }

    protected abstract getClassName(): string;

    public hasService<T extends CommonService<any>>(clazz: Class | (new (vue: ComponentPublicInstance) => T), index?: number): boolean {
        let className = typeof clazz === "string" ? clazz : (<Record<string, any>>clazz).class;
        let serviceName = this.getServiceName(className);
        let vue = this.getVue(serviceName, index || 0);
        return typeof vue !== "undefined";
    }

    public getService<T extends CommonService<any>>(clazz: Class | (new (vue: ComponentPublicInstance) => T), index?: number): T {
        let className = typeof clazz === "string" ? clazz : (<Record<string, any>>clazz).class;
        let serviceName = this.getServiceName(className);
        let vue = this.getVue(serviceName, index || 0);
        return (<Record<string, any>>vue)[serviceName];
    }

    get service(): U {
        return (<Record<string, any>>this.vue)[this.getServiceName()];
    }

    public getValue(name: string): any {
        return (<Record<string, any>>this.vue)[name];
    }

    public getProp(name: string): any {
        return this.vue.$props ? (<Record<string, any>>this.vue.$props)[name] : undefined;
    }

    public getRef(name: string): any {
        return this.vue.$refs[name];
    }

    get emitter(): EventEmitter2 {
        return CommonService._emitter;
    }

    get vue(): ComponentPublicInstance {
        return this._vue;
    }

}