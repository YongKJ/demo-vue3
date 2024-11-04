import { CommonService } from "@/common/core/CommonService";
import { Class } from "@/common/pojo/enum/Class";
import { ComponentPublicInstance } from "vue";

export class WallpaperService extends CommonService<WallpaperService> {

    public constructor(vue: ComponentPublicInstance) {
        super(vue);
    }

    public initData(): void {
        this.screenResizeWatch();
        this.scrollbarColorSetting();
    }

    private scrollbarColorSetting(): void {
        let scrollbars = document.getElementsByClassName("scrollbar__thumb");
        for (let i = 0; i < scrollbars.length; i++) {
            let scrollbar = scrollbars[i];
            scrollbar.setAttribute("style", "background-color: rgba(" + this.getProp("color") + ",0.3)");
        }
    }

    public getBgImgStyle(bgImg: string): Record<string, any> {
        return {
            backgroundImage: 'url(' + bgImg + ')'
        };
    }

    public getScrollbarHeightStyle(): Record<string, any> {
        let screenHeight = document.documentElement.clientHeight;
        return {
            height: screenHeight + "px",
        };
    }

    public getMainWidthStyle(): Record<string, any> {
        let screenWidth = document.documentElement.clientWidth;
        return {
            width: screenWidth + "px"
        };
    }

    protected getClassName(): string {
        return Class.WallpaperService;
    }

    static get class(): string {
        return Class.WallpaperService;
    }

}