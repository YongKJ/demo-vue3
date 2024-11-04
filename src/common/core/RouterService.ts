import {GenUtil} from "@/common/util/GenUtil";
import {ComponentPublicInstance} from "vue";
import {CookieService} from "@/common/core/CookieService";

export abstract class RouterService extends CookieService {

    protected abstract get vue(): ComponentPublicInstance;

    protected constructor() {
        super();
    }

    public toDefault(): void {
        this.toRouter("/");
    }

    protected toTest(): void {
        this.toRouter("/test");
    }

    protected toRouter(path: string, time = 1500, query?: Record<string, any>): void {
        let uid = GenUtil.getUrlKey("uid");
        if (typeof uid !== "undefined" && uid.length > 0) {
            typeof query === "undefined" ? query = {uid: uid} : query.uid = uid;
        }
        GenUtil.timer(() => this.vue.$router.push(
            typeof query === "undefined" ? {path: path} : {path: path, query: query}).then(), time);
    }

    get routerName(): string {
        return <string>this.vue.$router.currentRoute.value.name;
    }

}