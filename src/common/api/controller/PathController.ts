import { ResponseData } from "@/common/api/pojo/dto/ResponseData";
import { PathService } from "@/common/api/service/PathService";
import { GenUtil } from "@/common/util/GenUtil";

export class PathController {

    private readonly pathService: PathService;

    public constructor() {
        this.pathService = new PathService();
    }

    public view(path: string): Promise<string> {
        return this.pathService.view(<string>GenUtil.getEnCode(path));
    }

    public read(path: string): Promise<ResponseData | Error> {
        return this.pathService.read(<string>GenUtil.getEnCode(path));
    }

    public write(path: string, content: string, thenFunc: () => void, catchFunc: (err: any) => void): Promise<void> {
        return this.pathService.write(<string>GenUtil.getEnCode(path), content, thenFunc, catchFunc);
    }

    public uploadMdPicture(path: string, file: File): Promise<Record<string, any>> {
        return this.pathService.uploadMdPicture(<string>GenUtil.getEnCode(path), file);
    }

}