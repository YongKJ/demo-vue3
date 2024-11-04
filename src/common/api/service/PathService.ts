import { ResponseData } from "@/common/api/pojo/dto/ResponseData";
import { Global } from "@/common/config/Global";
import { Log } from "@/common/pojo/dto/Log";
import { ApiUtil } from "@/common/util/ApiUtil";
import { GenUtil } from "@/common/util/GenUtil";
import { LogUtil } from "@/common/util/LogUtil";

export class PathService {

    private readonly BASE_URL = Global.BASE_URL;
    private readonly WRITE = this.BASE_URL + "/path/write";
    private readonly READ = this.BASE_URL + "/path/read";
    private readonly VIEW = this.BASE_URL + "/path/view";
    private readonly UPLOAD_MD_PICTURE = this.BASE_URL + "/path/uploadMdPicture";

    public async uploadMdPicture(path: string, file: File): Promise<Record<string, any>> {
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", file);
        let responseData = await ApiUtil.requestWithFormDataAndTokenByPostToEntity(this.UPLOAD_MD_PICTURE, formData, ResponseData);
        if (responseData instanceof ResponseData) {
            return responseData.data;
        }
        LogUtil.loggerLine(Log.of("ApiUtil", "uploadMdPicture", "err", responseData));
        return {};
    }

    public write(path: string, content: string, thenFunc: () => void, catchFunc: (err: any) => void): Promise<void> {
        let formData = new FormData();
        formData.append("path", path);
        formData.append("content", content);
        return ApiUtil.requestWithFormDataAndFuncAndTokenByPost(this.WRITE, formData, thenFunc, catchFunc);
    }

    public async view(path: string): Promise<string> {
        let params = new Map<string, any>([
            ["path", path]
        ]);
        let responseData =  await ApiUtil.requestWithParamsByGet(this.VIEW, params);
        if (responseData instanceof Error) {
            LogUtil.loggerLine(Log.of("ApiUtil", "view", "err", responseData));
        }
        return GenUtil.strToString(responseData);
    }

    public read(path: string): Promise<ResponseData | Error> {
        let params = new Map<string, any>([
            ["path", path]
        ]);
        return ApiUtil.requestWithParamsAndTokenByGetToEntity(this.READ, params, ResponseData);
    }

}