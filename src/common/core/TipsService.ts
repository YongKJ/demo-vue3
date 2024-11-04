import {ElMessageBox, ElMessage, MessageBoxData} from "element-plus";
import {ResizeService} from "@/common/core/ResizeService";

export abstract class TipsService extends ResizeService {

    protected constructor() {
        super();
    }

    protected warningConfirm(message: string, title: string, thenFunc: () => void, catchFunc: () => void): void {
        TipsService.confirm(message, title, "warning", thenFunc, catchFunc);
    }

    protected errorConfirm(message: string, title: string): void {
        TipsService.confirm(message, title, "error");
    }

    private static confirm(message: string, title: string, type: '' | 'success' | 'warning' | 'info' | 'error', thenFunc?: () => void, catchFunc?: () => void): void {
        ElMessageBox.confirm(message, title, {
            confirmButtonText: "确定",
            cancelButtonText: "返回",
            buttonSize: "default",
            type: type
        }).then(thenFunc || (() => {
        })).catch(catchFunc || (() => {
        }));
    }

    protected inputPrompt(message: string, title: string, inputInfo: string, thenFunc: (message: MessageBoxData) => void, catchFunc: () => void): void {
        this.prompt(message, title, inputInfo, undefined, thenFunc, catchFunc);
    }

    protected prompt(message: string, title: string, inputInfo: string, inputValue?: string, thenFunc?: (message: MessageBoxData) => void, catchFunc?: () => void): void {
        ElMessageBox.prompt(message, title, {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            buttonSize: "default",
            inputPlaceholder: inputInfo,
            inputValue: inputValue
        }).then(thenFunc || (() => {
        })).catch(catchFunc || (() => {
        }));
    }

    protected success(msg: string): void {
        ElMessage.success(msg);
    }

    protected warning(msg: string): void {
        ElMessage.warning(msg);
    }

    public error(msg: string): void {
        ElMessage.error(msg);
    }

    protected info(msg: string): void {
        ElMessage.info(msg);
    }

}