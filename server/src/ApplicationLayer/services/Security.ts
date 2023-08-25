import { IDomainEntity } from "../../DomainLayer/Common/Common.Abstracts";
import { AcountManagerId, BussinessId } from "../../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects";
import crypto from 'crypto';
import { WaitedPermissionRequest, AccessPermissionRequest, RequestState } from "../../PresentationLayer/Requests";
import { PermissionResult } from "../Responses";
import { RondomIdGenarator } from "../Tools";


export class User implements IDomainEntity<AcountManagerId>{

    private __id: AcountManagerId
    private __bussinessId: BussinessId
    private __name: string
    private __surname: string
    private __email: string
    private __password: string
    private __tokenId: string

    get id(): AcountManagerId {
        return this.__id;
    }
    public get tokenId() {
        return this.__tokenId;
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
    constructor(id: AcountManagerId, bussinessId: BussinessId, tokenId: string, email: string, password: string, name: string, surname: string) {

        this.__id = id;
        this.__bussinessId = bussinessId;
        this.__tokenId = tokenId;
        this.__email = email;
        this.__password = password;
        this.__name = name;
        this.__surname = surname;
    }

}

export class SecurityManager {

    private static __passwordSalt: string = "Salt-Password"

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
    static base64UrlDecode(base64Url: string) {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = atob(base64);
        return decodeURIComponent(encodeURIComponent(decoded));
    }
    static hashPassword(password: string): string {

        return this.hashString(password + this.__passwordSalt);
    }
    static VerifyPassword(password: string, hashedPassword: string) {
        const hash = this.hashPassword(password);
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
        return requests.some(req => req.email == req.email && req.customerName == request.customerName && req.customerSurname == request.customerSurname)
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
    private static AcceptionById(id: string) {
        const waitedRequest = this.__requests[id]
        this.__responses[id] = waitedRequest.Accept()
        delete this.__requests[id]
    }
    private static Acception(waitedRequest: WaitedPermissionRequest) {

        this.__responses[waitedRequest.requestId] = waitedRequest.Accept()
        delete this.__requests[waitedRequest.requestId]
    }
    private static AddRequestToLine(waitedRequest: WaitedPermissionRequest) {
        this.__requests[waitedRequest.requestId] = waitedRequest;
    }
    private static RejectionById(id: string) {

        const waitedRequest = this.__requests[id]
        this.__responses[id] = waitedRequest.Reject();
        delete this.__requests[id]
    }
    static async SendRequestAndWaitForRepsonseAsync(request: AccessPermissionRequest): Promise<PermissionResult> {

        return new Promise<PermissionResult>((resolve, reject) => {

            if (this.IsExistRequestAlready(request)) {
                reject("Zaten şuanda bir İstek oluşturulmuş!")
            }
            const id = RondomIdGenarator.CreateId(7)
            const waitedRequest = new WaitedPermissionRequest(request.subscribeType,
                request.timeAmount,
                request.customerName,
                request.customerSurname,
                request.bussinessName,
                request.email,
                id);
            this.AddRequestToLine(waitedRequest);
            /////test için
            this.Acception(waitedRequest)
            resolve(this.__responses[id])
            ////////
            this.__requests[id] = waitedRequest;
            let intervalCount = 0;
            const intervalId = setInterval(() => {

                if (intervalCount == 9) {

                    this.__responses[id] = waitedRequest.Timeout()
                    delete this.__requests[id]
                    clearInterval(intervalId)
                    reject(this.__responses[id])
                }
                if (waitedRequest.state == RequestState.Answered) {

                    delete this.__requests[id]
                    clearInterval(intervalId)

                    if (this.__responses[id].result) {
                        resolve(this.__responses[id])
                    }
                    else {
                        reject(this.__responses[id])
                    }
                }
                intervalCount++
            }, 6000)


        })

    }

}



