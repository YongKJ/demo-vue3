import {debounce} from "lodash-es";
import {LogUtil} from "@/common/util/LogUtil";
import {Log} from "@/common/pojo/dto/Log";
import {GenUtil} from "@/common/util/GenUtil";
import {ComponentPublicInstance} from "vue";
import {StoreService} from "@/common/core/StoreService";

export abstract class ResizeService extends StoreService {

    protected constructor() {
        super();
    }

    protected abstract get vue(): ComponentPublicInstance;

    protected screenResizeWatch(): void {
        window.addEventListener("resize", debounce(async () => {
            let screenHeight = document.documentElement.clientHeight + "px";
            LogUtil.loggerLine(Log.of("WallpaperService", "setScrollbarHeightResize", "screenHeight", screenHeight));
            do {
                ResizeService.setStyleHeight(screenHeight);
                await GenUtil.sleep(340);
                LogUtil.loggerLine(Log.of("WallpaperService", "setScrollbarHeightResize", "styleHeight", ResizeService.styleHeight()));
            } while (screenHeight !== ResizeService.styleHeight());
        }, 340))
    }

    private static setStyleHeight(screenHeight: string): void {
        const scroller = <HTMLDivElement>document.getElementsByClassName("scrollbar__scroller")[0];
        scroller.setAttribute("style", "height: " + screenHeight);
    }

    private static styleHeight(): string {
        const scroller = <HTMLDivElement>document.getElementsByClassName("scrollbar__scroller")[0];
        return scroller.style.height;
    }

}