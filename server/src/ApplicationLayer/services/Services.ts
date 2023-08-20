import { IDomainEntity } from "../../DomainLayer/Common/Common.Abstracts"
import { Id } from "../../DomainLayer/Common/Common.ValueObjects"
import { AcountManagerId } from "../../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects"
import { AccessPermissionRequest, LoginRequest, RegisterRequest, RequestState, WaitedPermissionRequest } from "../../PresentationLayer/Requests"
import { EmailHasBeenUsedAlready, EmailHasNotFound, WrongPasswordEntered } from "../Errors"
import { UserRepository } from "../Repositories"
import { PermissionResult } from "../Responses"

import { RondomIdGenarator } from "../Tools"
import { SecurityManager, User } from "./Security"



export interface IAdvancedService<TId extends Id, TEntity extends IDomainEntity<TId>> extends IReadOnlyService<TId, TEntity> {

    RemoveBy(predicate: (entity: TEntity) => boolean): void
    AddTo(entity: TEntity): void
    Remove(id: TId): void
    Update(id: TId, newEntity: TEntity): void

}
export interface IReadOnlyService<TId extends Id, TEntity extends IDomainEntity<TId>> {

    GetBy(predicate: (entity: TEntity) => boolean): TEntity | null
    Some(predicate: (entity: TEntity) => boolean): boolean
    Includes(entity: TEntity): boolean;
    GetAllBy(predicate: (entity: TEntity) => boolean): TEntity[]
}
export class UserService implements IReadOnlyService<AcountManagerId, User>{

    private __repo: UserRepository;
    private static __instance: UserService;

    private constructor(repo: UserRepository) {
        this.__repo = repo;
    }

    static GetService() {

        if (!this.__instance) {

            this.__instance = new UserService(UserRepository.GetRepo());
        }
        return this.__instance;
    }
    GetBy(predicate: (entity: User) => boolean): User | null {
        throw new Error("Method not implemented.")
    }
    Some(predicate: (entity: User) => boolean): boolean {
        throw new Error("Method not implemented.")
    }
    Includes(entity: User): boolean {
        throw new Error("Method not implemented.")
    }
    GetAllBy(predicate: (entity: User) => boolean): User[] {
        throw new Error("Method not implemented.")
    }
    Register(req: RegisterRequest): User {

        const IsExist = this.Some(user => user.email == req.email)
        if (IsExist) {

            throw new EmailHasBeenUsedAlready()
        }
        const hashedPassword = SecurityManager.hashPassword(req.password);

        const user = new User(
            req.permission.managerId,
            req.permission.bussinessId,
            RondomIdGenarator.CreateId(10),
            req.email,
            hashedPassword,
            req.name,
            req.surname
        )


        this.__repo.add(user)
        return user;
    }
    Login(request: LoginRequest): User {
        const user = this.__repo.getBy(e => e.email == request.email);
        if (!!user) {
            const password = request.password
            const IsVerified = SecurityManager.VerifyPassword(password, user.password)
            if (IsVerified) {
                return user;
            }
            else {
                throw new WrongPasswordEntered()
            }
        }
        else {
            throw new EmailHasNotFound()
        }

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







