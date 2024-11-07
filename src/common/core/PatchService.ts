import { CommonService } from "@/common/core/CommonService";
import { ComponentPublicInstance } from "vue";
import { WallpaperService } from "@/common/service/WallpaperService";
import { Class } from "@/common/pojo/enum/Class";
import { DemoTestService } from "@/common/service/DemoTestService";
import { VueParticlesService } from "@/common/service/VueParticlesService";
import { RouterService } from "./RouterService";
import { RichTextEditPlusService } from "../service/RichTextEditPlusService";
import { MarkdownEditPlusService } from "../service/MarkdownEditPlusService";

export abstract class PatchService extends RouterService {

    protected constructor() {
        super();
    }

    protected abstract getService<T extends CommonService<any>>(clazz: Class | (new (vue: ComponentPublicInstance) => T), index?: number): T;

    get vueParticlesService(): VueParticlesService {
        return this.getService(Class.VueParticlesService);
    }

    get wallpaperService(): WallpaperService {
        return this.getService(Class.WallpaperService);
    }

    get demoTestService(): DemoTestService {
        return this.getService(Class.DemoTestService);
    }

    get richTextEditPlusService(): RichTextEditPlusService {
        return this.getService(Class.RichTextEditPlusService);
    }

    get markdownEditPlusService(): MarkdownEditPlusService {
        return this.getService(Class.MarkdownEditPlusService);
    }

}
