import { CommonService } from "@/common/core/CommonService";
import { ComponentPublicInstance } from "vue";
import { Class } from "@/common/pojo/enum/Class";
import { Path } from "@/common/api/pojo/po/Path";
import { Quill } from "@vueup/vue-quill";
import autobind from "autobind-decorator";
import { DataUtil } from "@/common/util/DataUtil";
import { GenUtil } from "@/common/util/GenUtil";
import QuillToggleFullscreenButton from 'quill-toggle-fullscreen-button';
import { LogUtil } from "../util/LogUtil";
import { Log } from "../pojo/dto/Log";
// @ts-ignore
import ImageUploader from "quill-image-uploader";
// @ts-ignore
import TableHandler, { rewirteFormats } from 'quill1.3.7-table-module';
// @ts-ignore
import BlotFormatter from 'quill-blot-formatter';


export class RichTextEditPlusService extends CommonService<RichTextEditPlusService> {

    private _top: number;
    private _left: number;
    private _mode: string;
    private _width: number;
    private _height: number;
    private _screen: string;
    private initFlag: boolean;
    private _visible: boolean;
    private hasChange: boolean;
    private _rtContent: string;
    private _richTextPath: Path;
    private editor: Quill | null;
    private viewer: Quill | null;
    private readonly screenHeight: number;
    private readonly _modules: Array<Module>;
    private readonly _toolbarOption: Array<Array<any>>;

    public constructor(vue: ComponentPublicInstance) {
        super(vue);
        this._top = 20;
        this._left = 20;
        this.editor = null;
        this.viewer = null;
        this._mode = "edit";
        this._rtContent = "";
        this._screen = "full";
        this.initFlag = false;
        this._visible = false;
        this.hasChange = false;
        this._richTextPath = new Path();
        this._modules = this.getModules();
        this._width = document.documentElement.clientWidth - 40;
        this._height = document.documentElement.clientHeight - 88;
        this.screenHeight = document.documentElement.clientHeight;
        this._toolbarOption = RichTextEditPlusService.getToolbarOption();
    }

    public async initData(): Promise<void> {
        if (this._screen === "fit") {
            this.vue.$nextTick(() => {
                rewirteFormats();
                let quillContainer = <HTMLElement>document.getElementsByClassName("ql-container")[0];
                if (typeof quillContainer !== "undefined") {
                    quillContainer.setAttribute("style", "height: 750px;width: 100%;border: unset;");
                }

                let quillEditor = <HTMLElement>document.getElementsByClassName("ql-editor")[0];
                if (typeof quillEditor !== "undefined") {
                    quillEditor.setAttribute("style", "overflow-y: unset");
                }
            });
        } else {
            if (this._mode === 'read' && !this.initFlag) {
                this.vue.$nextTick(() => {
                    this.monitorQuillContainerSize();
                    this.initFlag = true;
                    this.imageFormat();
                    rewirteFormats();
                });
            }
        }
        this._rtContent = await this.getRtContent();
    }

    public getOptions(): Record<string, any> {
        let option = {
            theme: 'snow',
            readOnly: false,
            placeholder: "请输入内容...",
            modules: {
                keyboard: {
                    bindings: {
                        ...TableHandler.keyboradHandler,
                    },
                },
            },
        }
        if (this._mode === "read") {
            // option.readOnly = true;
            option.placeholder = "";
        }
        return option;
    }

    public getViewerOptions(): Record<string, any> {
        return {
            theme: 'snow',
            modules: {
                toolbar: false,
                keyboard: {
                    bindings: {
                        ...TableHandler.keyboradHandler,
                    },
                },
            },
            readOnly: true
        }
    }

    private imageFormat(): void {
        let BaseImageFormat = <any>Quill.import('formats/image');
        const ImageFormatAttributesList = [
            'alt',
            'height',
            'width',
            'style'
        ];

        class ImageFormat extends BaseImageFormat {
            static formats(domNode: any) {
                return ImageFormatAttributesList.reduce(function (formats: Record<string, any>, attribute) {
                    if (domNode.hasAttribute(attribute)) {
                        formats[attribute] = domNode.getAttribute(attribute);
                    }
                    return formats;
                }, {});
            }
            format(name: string, value: string) {
                if (ImageFormatAttributesList.indexOf(name) > -1) {
                    if (value) {
                        this.domNode.setAttribute(name, value);
                    } else {
                        this.domNode.removeAttribute(name);
                    }
                } else {
                    super.format(name, value);
                }
            }
        }

        Quill.register(ImageFormat, true);
    }

    private monitorQuillContainerSize(): void {
        this.vue.$nextTick(async () => {
            await GenUtil.sleep(1000);
            let width = this._width + 'px';
            let height = this._height + 'px';
            let quillWrapper = <HTMLDivElement>document.getElementsByClassName("quillWrapper")[0];
            if (typeof quillWrapper !== "undefined") {
                quillWrapper.setAttribute("style", "height: " + height + ";width: " + width);
            }

            let quillContainer = <HTMLElement>document.getElementsByClassName("ql-container")[0];
            if (typeof quillContainer === "undefined") {
                return;
            }

            this.changeQuillContainerHeight();
            const observer = new MutationObserver(this.changeQuillContainerHeight);
            observer.observe(quillContainer, { attributes: true });
        });
    }

    @autobind
    private changeQuillContainerHeight(): void {
        let quillContainer = <HTMLElement>document.getElementsByClassName("ql-container")[0];
        if (typeof quillContainer === "undefined") {
            return;
        }

        let quillContainerStyleStr = quillContainer.getAttribute("style");
        if (quillContainerStyleStr?.includes("px") &&
            !(quillContainerStyleStr?.includes(this.changeScreenHeight() + "") ||
                quillContainerStyleStr?.includes(this.fullScreenScreenHeight() + ""))) {
            return;
        }

        let containerHeightStr = (this.isFullscreen() ? this.screenHeight : this._height) - this.getToolbarHeight() + "px";
        quillContainer.setAttribute("style", "height: " + containerHeightStr + ";width: 100%;overflow: auto");

        LogUtil.loggerLine(Log.of("RichTextEditPlusLatestService", "changeQuillContainerHeight", "quillContainerStyleStr", quillContainerStyleStr));
        LogUtil.loggerLine(Log.of("RichTextEditPlusLatestService", "changeQuillContainerHeight", "containerHeightStr", containerHeightStr));
        console.log("-----------------------------------------------------------------------------------------------------------------------------------------");
    }

    private isFullscreen(): boolean {
        let fullscreenContainer = <HTMLElement>document.getElementsByClassName("is-fullscreen")[0];
        let flag = typeof fullscreenContainer !== "undefined";

        LogUtil.loggerLine(Log.of("RichTextEditPlusLatestService", "isFullscreen", "flag", flag));

        return flag;
    }

    private fullScreenScreenHeight(): number {
        return document.documentElement.clientHeight - 88;
    }

    private changeScreenHeight(): number {
        return document.documentElement.clientHeight - 48;
    }

    private getToolbarHeight(): number {
        let qlToolbar = <HTMLDivElement>document.getElementsByClassName("ql-toolbar")[0];
        if (typeof qlToolbar === "undefined") {
            return 0;
        }

        let toolbarHeightStr = window.getComputedStyle(qlToolbar).getPropertyValue('height');
        return GenUtil.strToNumber(toolbarHeightStr.replace("px", ""));
    }

    private changeContainerHeight(height: number): void {
        let quillContainer = <HTMLElement>document.getElementsByClassName("ql-container")[0];
        if (typeof quillContainer === "undefined") {
            return;
        }

        quillContainer.setAttribute("style", "height: " + height + "px;width: 100%;overflow: auto");
    }

    public changeScreen(): void {
        if (!this.hasChange) {
            this._top = 0;
            this._left = 0;
            this.hasChange = true;
            this._width = document.documentElement.clientWidth;
            this._height = document.documentElement.clientHeight - 48;
            this.changeContainerHeight(this.changeScreenHeight());
            return;
        }
        this._top = 20;
        this._left = 20;
        this.hasChange = false;
        this._width = document.documentElement.clientWidth - 40;
        this._height = document.documentElement.clientHeight - 88;
        this.changeContainerHeight(this.changeScreenHeight());
    }

    @autobind
    public initEditor(quill: Quill): void {
        this.editor = quill;
    }

    @autobind
    public initViewerEditor(quill: Quill): void {
        this.viewer = quill;
    }

    private async getRtContent(): Promise<string> {
        if (this._richTextPath.path.length === 0) return await this.getRichTextHtml();
        if (this.routerName === 'sharePlus' || this.routerName === 'test') {
            try {
                return await this.pathController.view(this._richTextPath.path);
            } catch (e) {
                this.error("获取文件内容失败！" + e);
                return "";
            }
        }

        let responseData = await this.pathController.read(this._richTextPath.path);
        if (responseData instanceof Error) {
            this.error("获取文件内容失败！" + responseData.message);
            return "";
        }
        return responseData.data;
    }

    private async getRichTextHtml(): Promise<string> {
        let path = "overlay/data/MyCodes/RichText/quill/test.html";
        return this.pathController.view(path);
    }

    private getModules(): Array<Module> {
        return <any>Array.of(
            {
                name: "imageUploader",
                module: ImageUploader,
                options: {
                    upload: this.pictureUpload
                }
            },
            {
                name: "blotFormatter",
                module: BlotFormatter,
                options: {}
            },
            {
                name: "toggleFullscreenButton",
                module: QuillToggleFullscreenButton,
                options: true
            },
            {
                name: TableHandler.moduleName,
                module: TableHandler,
                options: {
                    fullWidth: true,
                    customButton: 'Custom Table',
                }
            }
        );
    }

    private static getToolbarOption(): Array<Array<any>> {
        return [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['link', 'image', 'video', { table: [] }],
            ['clean']
        ];
    }

    public closeRichText(): void {
        if (this.routerName === 'test') {
            this._rtContent = "";
            this._visible = false;
            this.initFlag = false;
            return;
        }

        if (this.routerName === 'sharePlus') {
            this._screen = "fit";
            this.initData();
            return;
        }

        this.warningConfirm("提示：是否保存文件？", "保存文件",
            async () => {
                await this.saveRTContent();
                this._rtContent = "";
                this._visible = false;
                this.initFlag = false;
            }, () => {
                this._rtContent = "";
                this._visible = false;
                this.initFlag = false;
            });
    }

    public async saveRTContent(): Promise<void> {
        await this.pathController.write(this._richTextPath.path, this._rtContent,
            () => this.success("保存文件内容成功！"),
            err => this.error("保存文件内容失败！" + err));
    }

    public async updateData(): Promise<void> {
        this._rtContent = await this.getRtContent();
    }

    public getRichTextEditorStyle(): Record<string, any> {
        return {
            overflow: "auto",
            height: this._height - 20 * 2 - 42 - 48 + "px"
        }
    }

    @autobind
    private async pictureUpload(image: File): Promise<string> {
        let path = this._richTextPath.path.replace("." + this._richTextPath.ext, "");
        let responseData = await this.pathController.uploadMdPicture(path, image);
        let picturePath = <Path>DataUtil.convertData(responseData, Path);
        return <string>GenUtil.getPathUrl(picturePath);
    }

    set screen(value: string) {
        this._screen = value;
    }

    get screen(): string {
        return this._screen;
    }

    set mode(value: string) {
        this._mode = value;
    }

    get mode(): string {
        return this._mode;
    }

    get modules(): Array<Module> {
        return this._modules;
    }

    get toolbarOption(): Array<Array<any>> {
        return this._toolbarOption;
    }

    set rtContent(value: string) {
        this._rtContent = value;
    }

    get rtContent(): string {
        return this._rtContent;
    }

    get richTextPath(): Path {
        return this._richTextPath;
    }

    set richTextPath(value: Path) {
        this._richTextPath = value;
    }

    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
        if (!value) return;
        this.initData().then();
    }

    get top(): number {
        return this._top;
    }

    get left(): number {
        return this._left;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    protected getClassName(): string {
        return Class.RichTextEditPlusService;
    }

    static get class(): string {
        return Class.RichTextEditPlusService;
    }

}

export type Module = { name: string; module: unknown; options?: object }