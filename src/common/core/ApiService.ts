import EventEmitter2 from "eventemitter2";

export abstract class ApiService extends EventEmitter2 {

    protected constructor() {
        super();
    }

}