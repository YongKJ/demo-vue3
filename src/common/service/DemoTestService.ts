import { CommonService } from "@/common/core/CommonService";
import { Class } from "@/common/pojo/enum/Class";
import { ComponentPublicInstance } from "vue";

export class DemoTestService extends CommonService<DemoTestService> {

    private _richTextEditPlusVisible: boolean;
    private _markdownEditPlusVisible: boolean;

    public constructor(vue: ComponentPublicInstance) {
        super(vue);
        this._richTextEditPlusVisible = false;
        this._markdownEditPlusVisible = false;
    }

    public initData(): void {

    }

    public quillDemo(): void {
        this._richTextEditPlusVisible = true;
        this.vue.$nextTick(() => {
            this.richTextEditPlusService.screen = "full";
            this.richTextEditPlusService.mode = "read";
            this.richTextEditPlusService.visible = true;
        });
    }

    public vditorDemo(): void {
        this._markdownEditPlusVisible = true;
        this.vue.$nextTick(() => {
            this.markdownEditPlusService.screen = "full";
            this.markdownEditPlusService.mode = "read";
            this.markdownEditPlusService.visible = true;
        });
    }

    get richTextEditPlusVisible(): boolean {
        return this._richTextEditPlusVisible;
    }

    get markdownEditPlusVisible(): boolean {
        return this._markdownEditPlusVisible;
    }

    protected getClassName(): string {
        return Class.DemoTestService;
    }

    static get class(): string {
        return Class.DemoTestService;
    }

}