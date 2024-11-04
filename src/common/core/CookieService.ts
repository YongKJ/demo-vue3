import { TipsService } from "@/common/core/TipsService";
import { ComponentPublicInstance } from "vue";

export abstract class CookieService extends TipsService {

    protected constructor() {
        super();
    }

    protected abstract get vue(): ComponentPublicInstance;

    protected set(key: string, value: any, time?: number): void {
        time = time || 24 * 60 * 60;
        // @ts-ignore
        this.vue.$cookies.set(key, value, time);
    }

    protected modify(key: string, value: any, time?: number): void {
        if (this.has(key)) this.remove(key);
        time = time || 1;
        this.set(key, value, time * 24 * 60 * 60);
    }

    protected has(key: string): boolean {
        // @ts-ignore
        return this.vue.$cookies.isKey(key);
    }

    protected remove(key: string): void {
        // @ts-ignore
        this.vue.$cookies.remove(key);
    }

    protected get(key: string): any {
        // @ts-ignore
        return this.vue.$cookies.get(key);
    }

}