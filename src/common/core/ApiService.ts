import EventEmitter2 from "eventemitter2";
import { PathController } from "../api/controller/PathController";

export abstract class ApiService extends EventEmitter2 {

    private static readonly _pathController = new PathController();

    protected constructor() {
        super();
    }

    get pathController(): PathController {
        return ApiService._pathController;
    }

}