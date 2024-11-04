import {ApiService} from "@/common/core/ApiService";
import {GenUtil} from "@/common/util/GenUtil";

export abstract class StoreService extends ApiService {

    private static readonly mapData = new Map<string, any>();

    protected constructor() {
        super();
    }

    get isDesktop(): boolean {
        let isDesktop = StoreService.mapData.get("isDesktop");
        if (typeof isDesktop === "undefined") {
            isDesktop = GenUtil.checkDesktop();
            StoreService.mapData.set("isDesktop", isDesktop);
        }
        return isDesktop;
    }

    get isLocalHostName(): boolean {
        let isLocalHostName = StoreService.mapData.get("isLocalHostName");
        if (typeof isLocalHostName === "undefined") {
            isLocalHostName = GenUtil.checkLocalHostName();
            StoreService.mapData.set("isLocalHostName", isLocalHostName);
        }
        return isLocalHostName;
    }

}