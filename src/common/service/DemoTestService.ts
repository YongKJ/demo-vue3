import { CommonService } from "@/common/core/CommonService";
import { ComponentPublicInstance } from "vue";
import { Class } from "@/common/pojo/enum/Class";

export class DemoTestService extends CommonService<DemoTestService> {

    public constructor(vue: ComponentPublicInstance) {
        super(vue);
    }

    public initData(): void {

    }

    public test(): void {

    }

    protected getClassName(): string {
        return Class.DemoTestService;
    }

    static get class(): string {
        return Class.DemoTestService;
    }

}