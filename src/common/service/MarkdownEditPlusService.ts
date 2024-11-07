import { CommonService } from "@/common/core/CommonService";
import { ComponentPublicInstance } from "vue";
import { Class } from "@/common/pojo/enum/Class";
import Vditor from "vditor";
import { Path } from "@/common/api/pojo/po/Path";
import { LogUtil } from "@/common/util/LogUtil";
import { Log } from "@/common/pojo/dto/Log";
import { DataUtil } from "@/common/util/DataUtil";
import { GenUtil } from "@/common/util/GenUtil";
import autobind from "autobind-decorator";
import { Global } from "@/common/config/Global";
import { MarkdownEditPlusData } from "@/common/pojo/po/MarkdownEditPlusData";
// @ts-ignore
import VditorPreview from "vditor/dist/method.min";

export class MarkdownEditPlusService extends CommonService<MarkdownEditPlusService> {

    private _top: number;
    private _left: number;
    private _mode: string;
    private _width: number;
    private _screen: string;
    private _height: number;
    private _visible: boolean;
    private hasChange: boolean;
    private _markdownPath: Path;
    private vditor: Vditor | null;

    private readonly intervalTimer: any;
    private readonly BASE_URL = Global.BASE_URL;
    private readonly UPLOAD_MD_FILE = this.BASE_URL + "/path/uploadMdFile";
    private readonly LINK_TO_IMG_URL = this.BASE_URL + "/path/linkToImgUrl";

    public constructor(vue: ComponentPublicInstance) {
        super(vue);
        this._top = 20;
        this._left = 20;
        this.vditor = null;
        this._mode = "edit";
        this._visible = false;
        this._screen = "full";
        this.hasChange = false;
        this._markdownPath = new Path();
        this._width = document.documentElement.clientWidth - 40;
        this._height = document.documentElement.clientHeight - 88;
        this.intervalTimer = setInterval(this.saveMdContent, 10 * 1000);
    }

    public async initData(): Promise<void> {
        this.initViewer();
        await GenUtil.sleep(50);
        if (this.vditor != null && this.vditor.vditor && this.vditor.vditor.element) {
            this.vditor?.destroy();
        }
        this.vditor = new Vditor(this.getRef("vditor"), {
            cdn: "https://cdn.yongkj.cn/vditor@3.10.7",
            toolbar: <any>MarkdownEditPlusService.getToolbar(),
            mode: "wysiwyg",
            theme: "dark",
            width: this._width,
            height: this._height,
            typewriterMode: true,
            outline: {
                enable: true,
                position: "left"
            },
            tab: "\t",
            undoDelay: 50,
            icon: "material",
            value: await this.getMdContent(),
            counter: {
                enable: true
            },
            preview: {
                theme: {
                    current: "dark",
                    path: "https://cdn.yongkj.cn/vditor@3.10.7/dist/css/content-theme",
                },
                hljs: {
                    enable: true,
                    style: "solarized-dark",
                    lineNumber: true
                },
                math: {
                    engine: "MathJax",
                    macros: {
                        "bf": "{\\boldsymbol f}",
                        "bu": "{\\boldsymbol u}",
                        "bv": "{\\boldsymbol v}",
                        "bw": "{\\boldsymbol w}"
                    },
                    inlineDigit: true
                }
            },
            upload: {
                url: this.UPLOAD_MD_FILE,
                setHeaders: this.getHeader,
                linkToImgUrl: this.LINK_TO_IMG_URL,
                format: MarkdownEditPlusService.formatHandler,
                linkToImgFormat: MarkdownEditPlusService.linkToImgFormatHandler,
            },
            hint: {
                emoji: MarkdownEditPlusData.EMOJI_DATA,
                emojiPath: "https://cdn.yongkj.cn/vditor@3.10.7/dist/images/emoji"
            },
            toolbarConfig: {
                pin: false
            },
            cache: {
                enable: false,
            },
        });
    }

    private initViewer(): void {
        if (this._mode === 'read') {
            return;
        }

        this.vue.$nextTick(async () => {
            VditorPreview.preview(this.getRef("viewerVditor"), await this.getMdContent(), {
                cdn: "https://cdn.yongkj.cn/vditor@3.10.7",
                mode: "dark",
                theme: {
                    current: "dark",
                    path: "https://cdn.yongkj.cn/vditor@3.10.7/dist/css/content-theme"
                },
                hljs: {
                    enable: true,
                    lineNumber: true,
                    style: "solarized-dark"
                },
                math: {
                    engine: "MathJax",
                    macros: {
                        "bf": "{\\boldsymbol f}",
                        "bu": "{\\boldsymbol u}",
                        "bv": "{\\boldsymbol v}",
                        "bw": "{\\boldsymbol w}"
                    },
                    inlineDigit: true
                },
                emojiPath: "https://cdn.yongkj.cn/vditor@3.10.7/dist/images/emoji",
            });
            VditorPreview.codeRender(this.getRef("viewerVditor"));
        });
    }

    public changeScreen(): void {
        if (!this.hasChange) {
            this._top = 0;
            this._left = 0;
            this.hasChange = true;
            this._width = document.documentElement.clientWidth;
            this._height = document.documentElement.clientHeight - 48;
            return;
        }
        this._top = 20;
        this._left = 20;
        this.hasChange = false;
        this._width = document.documentElement.clientWidth - 40;
        this._height = document.documentElement.clientHeight - 88;
    }

    public async updateData(): Promise<void> {
        if (this.vditor == null) {
            this.error("文本内容获取失败！");
            return;
        }
        this.vditor.setValue(await this.getMdContent());
    }

    private async getMdContent(): Promise<string> {
        if (this._markdownPath.path.length === 0) return await this.getMarkdownContent();
        if (this.routerName === 'sharePlus' || this.routerName === 'test') {
            try {
                return await this.pathController.view(this._markdownPath.path);
            } catch (e) {
                this.error("获取文件内容失败！" + e);
                return "";
            }
        }

        let responseData = await this.pathController.read(this._markdownPath.path);
        if (responseData instanceof Error) {
            this.error("获取文件内容失败！" + responseData.message);
            return " ";
        }
        return responseData.data.length === 0 ? " " : responseData.data;
    }

    private async getMarkdownContent(): Promise<string> {
        let path = "overlay/data/MyCodes/Markdown/test.md";
        return this.pathController.view(path);
    }

    @autobind
    private getHeader(): Record<string, any> {
        let path = this._markdownPath.path.replace("." + this._markdownPath.ext, "");
        return {
            Authorization: "Bearer " + this.accessToken,
            path: <string>GenUtil.getEnCode(path)
        }
    }

    @autobind
    private static linkToImgFormatHandler(responseText: string): string {
        let recData = <Record<string, any>>GenUtil.strToRecord(responseText);
        let picturePath: Record<string, any> = recData.data;
        let url = GenUtil.getViewUrl(<any>picturePath);
        return GenUtil.recToStr({
            msg: "",
            code: 0,
            data: {
                url: url,
                originalURL: picturePath.url,
            }
        });
    }

    @autobind
    private static formatHandler(files: File[], responseText: string): string {
        let recData = <Record<string, any>>GenUtil.strToRecord(responseText);
        let lstPath = <Array<Path>>DataUtil.convertData(recData.data, Path);
        let formatData: Record<string, any> = {};
        for (let file of files) {
            let path = lstPath.find(p => p.name === file.name);
            if (typeof path === "undefined") continue;
            formatData[file.name] = GenUtil.getViewUrl(path);
        }
        if (files.length === 0) {
            for (let path of lstPath) {
                formatData[path.name] = GenUtil.getViewUrl(path);
            }
        }
        return GenUtil.recToStr({
            msg: "",
            code: 0,
            data: {
                errFiles: [],
                succMap: formatData
            }
        });
    }

    @autobind
    private async pictureHandler(files: File[]): Promise<string> {
        LogUtil.loggerLine(Log.of("MarkdownEditPlusService", "pictureHandler", "this._markdownPath", this._markdownPath));
        LogUtil.loggerLine(Log.of("MarkdownEditPlusService", "pictureHandler", "files", files));
        if (files.length === 0) return "";
        let path = this.markdownPath.path.replace("." + this.markdownPath.ext, "");
        let responseData = await this.pathController.uploadMdPicture(path, files[0]);
        let picturePath = <Path>DataUtil.convertData(responseData, Path);
        return <string>GenUtil.getPathUrl(picturePath);
    }

    private static getToolbar(): Array<string | Record<string, any>> {
        return ['emoji', 'headings', 'bold', 'italic', 'strike', 'link', '|', 'list',
            'ordered-list', 'check', 'outdent', 'indent', '|', 'quote', 'line',
            'code', 'inline-code', '|', 'upload', 'table', '|', 'undo', 'redo',
            '|', 'export'].concat(['fullscreen', 'outline', 'both', 'preview',
                'edit-mode',
                <any>{
                    name: "more",
                    toolbar: [
                        "code-theme",
                        "content-theme",
                        "devtools",
                        'info',
                        'help'
                    ]
                }
            ])
    }

    @autobind
    public async saveMdContent(autoSave?: boolean): Promise<void> {
        if (!this._visible || this._mode === 'read' ||
            this._markdownPath.path.length === 0) {
            return;
        }

        let value = this.vditor?.getValue();
        await this.pathController.write(this._markdownPath.path, <string>value,
            () => {
                if (typeof autoSave !== "undefined" && !autoSave) {
                    this.success("保存文件内容成功！");
                }
            },
            err => {
                if (typeof autoSave !== "undefined" && !autoSave) {
                    this.error("保存文件内容失败！" + err)
                }
            });
    }

    public closeMarkdown(): void {
        if (this.routerName === 'test') {
            this._visible = false;
            return;
        }

        if (this.routerName === 'sharePlus') {
            this._screen = "fit";
            this.initData();
            return;
        }

        this.warningConfirm("提示：是否保存文件？", "保存文件",
            async () => {
                await this.saveMdContent(false);
                this._visible = false;
            }, () => {
                this._visible = false;
            });
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

    set markdownPath(value: Path) {
        this._markdownPath = value;
    }

    get markdownPath(): Path {
        return this._markdownPath;
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
        return Class.MarkdownEditPlusService;
    }

    static get class(): string {
        return Class.MarkdownEditPlusService;
    }

}