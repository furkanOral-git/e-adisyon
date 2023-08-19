import { AccessPermissionRequest } from "../../PresentationLayer/Requests";
import { RondomIdGenarator } from "../Tools";
import crypto from 'crypto';


export class User {

    private __id: string;
    private __bussinessId: string
    private __name: string
    private __surname: string
    private __email: string
    private __password: string;
    

    public get id() {
        return this.__id;
    }
    public get bussinessId() {
        return this.__bussinessId;
    }
    public get name() {
        return this.__name;
    }
    public get email() {
        return this.__email;
    }
    public get password() {
        return this.__password;
    }
    constructor(id: string, bussinessId: string, email: string, password: string, name: string, surname: string) {

        this.__id = id;
        this.__bussinessId = bussinessId;
        this.__email = email;
        this.__password = password;
        this.__name = name;
        this.__surname = surname;
    }
}
export class SecurityManager {

    static hashString(input: string, algorithm: string = 'sha256'): string {

        const hash = crypto.createHash(algorithm);
        hash.update(input);
        return hash.digest('hex');
    }
    static base64UrlEncode(jsonObj: object): string {

        const jsonString = JSON.stringify(jsonObj);
        const base64 = Buffer.from(jsonString).toString('base64');
        const base64Url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        return base64Url;
    }
    static hashPassword(password: string, passwordSalt: string): string {

        return this.hashString(password + passwordSalt);
    }
    static VerifyPassword(password: string, passwordSalt: string, hashedPassword: string) {
        const hash = this.hashPassword(password, passwordSalt);
        return hashedPassword == hash
    }
}

export class AccessPermissionRequestManager {

    private static __requests: { [requestId: string]: WaitedPermissionRequest } = {}
    private static __responses: { [requestId: string]: PermissionResult } = {}

    public static get WaitedRequests() {
        return this.__requests;
    }
    private static IsExistRequestAlready(request: AccessPermissionRequest): boolean {
        const requests = Object.values(this.__requests)
        return requests.some(req => req.accessorInfos == request)
    }
    static VerifyResponseAndClearIfExist(id: string) {

        if (Object.keys(this.__responses).includes(id)) {

            delete this.__responses[id]
            return true;
        }
        else {
            return false;
        }
    }
    static async SendRequestAndWaitForRepsonseAsync(request: AccessPermissionRequest): Promise<PermissionResult> {

        return new Promise<PermissionResult>((resolve, reject) => {

            if (this.IsExistRequestAlready(request)) {
                reject("Zaten şuanda bir İstek oluşturulmuş!")
            }
            const id = RondomIdGenarator.CreateId(7)
            const waitedRequest = new WaitedPermissionRequest(request, id, this.__responses)
            this.__requests[id] = waitedRequest;
            let intervalCount = 0;
            const intervalId = setInterval(() => {

                if (intervalCount == 10) {
                    waitedRequest.Timeout()
                    delete this.__requests[id]
                    clearInterval(intervalId)
                    reject("İstek Zaman Aşımına Uğradı!")
                }
                if (waitedRequest.state == ResponseState.Answered) {
                    delete this.__requests[id]
                    clearInterval(intervalId)

                    if (waitedRequest.result) {
                        resolve(this.__responses[id])
                    }
                    else {
                        resolve(this.__responses[id])
                    }
                }
                intervalCount++
            }, 6000)


        })

    }

}
enum ResponseState {
    Waited,
    Answered,
    Timeout
}
abstract class PermissionResult {

    private __request: WaitedPermissionRequest


    constructor(request: WaitedPermissionRequest) {

        this.__request = request;

    }
    getState(): ResponseState {
        return this.__request.state
    }
    getResponse(): boolean {
        return this.__request.result
    }
}
class AcceptedPermissionResult extends PermissionResult {

    constructor(request: WaitedPermissionRequest) {
        super(request)

    }
}
class TimeoutPermissionResult extends PermissionResult {

    constructor(request: WaitedPermissionRequest) {
        super(request)

    }
}
class RejectedPermissionResult extends PermissionResult {

    constructor(request: WaitedPermissionRequest) {
        super(request)

    }
}

class WaitedPermissionRequest {

    private __request: AccessPermissionRequest
    private __requestId: string
    private __state: ResponseState
    private __result: boolean;
    private __responseInstances: { [requestId: string]: PermissionResult }

    public get state() {
        return this.__state;
    }
    public get accessorInfos() {
        return this.__request;
    }
    public get result() {
        return this.__result;
    }
    constructor(request: AccessPermissionRequest, requestId: string, responseInstances: { [requestId: string]: PermissionResult }) {

        this.__request = request;
        this.__requestId = requestId;
        this.__state = ResponseState.Waited;
        this.__result = false;
        this.__responseInstances = responseInstances;
    }

    Reject(): void {

        this.__state = ResponseState.Answered
        this.__result = false;
        this.__responseInstances[this.__requestId] = new RejectedPermissionResult(this);
    }
    Accept(): void {
        this.__state = ResponseState.Answered
        this.__result = true;
        this.__responseInstances[this.__requestId] = new AcceptedPermissionResult(this)
    }
    Timeout(): void {
        this.__state = ResponseState.Timeout
        this.__result = false;
        this.__responseInstances[this.__requestId] = new TimeoutPermissionResult(this)
    }
}

