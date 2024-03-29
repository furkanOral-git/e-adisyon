import { AcceptedPermissionResponse, AcceptedPermissionResult, RejectedPermissionResult, TimeoutPermissionResult } from "../ApplicationLayer/Responses";
import { SucceedAuthenticationResponse, PackageTypes } from "../ApplicationLayer/services/Authentication";
import { AcountManagerId, BussinessId } from "../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects";
import { RoomId } from "../DomainLayer/Domain.Room/Room.ValueObjects";


export abstract class BaseRequest {



}
export class GetSocketConnectionRequest extends BaseRequest {

    private __res: SucceedAuthenticationResponse
    private __bussinessId: BussinessId
    private __userId: AcountManagerId
    private __roomId: RoomId

    public get bussinessId() {
        return this.__bussinessId
    }
    public get auth() {
        return this.__res;
    }
    public get acountManagerId() {
        return this.__userId;
    }
    public get roomId() {
        return this.__roomId;
    }
    constructor(res: SucceedAuthenticationResponse, bussinessId: BussinessId, acountManagerId: AcountManagerId, roomId: RoomId) {
        super()
        this.__res = res;
        this.__bussinessId = bussinessId;
        this.__userId = acountManagerId;
        this.__roomId = roomId;
    }
}
export class EmploeeSocketConnectionRequest extends BaseRequest {

    private __name: string
    private __surname: string
    private __employeeType: string
    private __participantId: string | undefined


    public get participantId() {

        return this.__participantId;

    }
    public get name() {
        return this.__name;
    }
    public get surname() {
        return this.__surname;
    }
    public get employeeType() {
        return this.__employeeType;
    }
    constructor(participantId: string, name: string, surname: string, employeeType: string) {

        super()
        this.__participantId = participantId;
        this.__name = name;
        this.__surname = surname;
        this.__employeeType = employeeType;
    }
}
export class LoginRequest extends BaseRequest {


    private __email: string;
    private __password: string;


    public get email() {
        return this.__email;
    }
    public get password() {
        return this.__password;
    }

    constructor(email: string, password: string) {

        super()
        this.__email = email;
        this.__password = password;
    }
}
export class VertificationInfo {

    private __isVerified: boolean
    private __isAnswered: boolean
    get isAnswered() {
        return this.__isAnswered
    }
    private __email: string
    private __code: string
    get email() {
        return this.__email;
    }
    constructor(email: string, code: string) {

        this.__isVerified = false;
        this.__email = email;
        this.__code = code;
        this.__isAnswered = false;
    }
    Compare(code: string) {

        if (this.__code === code) this.Update(true)
        else this.Update(false);
    }

    private Update(isVerified: boolean) {

        this.__isVerified = isVerified;
        this.__isAnswered = true;
    }
}
export class RegisterRequest extends BaseRequest {

    private __email: string;
    private __name: string;
    private __surname: string;
    private __password: string;
    private __permission: AcceptedPermissionResponse

    public get email() {
        return this.__email;
    }
    public get name() {
        return this.__name;
    }
    public get surname() {
        return this.__surname;
    }
    public get permission() {
        return this.__permission
    }
    public get password() {
        return this.__password;
    }


    constructor(permission: AcceptedPermissionResponse, email: string, name: string, surname: string, password: string) {
        super()
        this.__email = email;
        this.__permission = permission;
        this.__name = name;
        this.__surname = surname;
        this.__password = password;
    }

}
export enum RequestState {
    Waited,
    Answered,
    Timeout
}
export class AccessPermissionRequest extends BaseRequest {


    private __subscribeType: PackageTypes
    public get subscribeType() {
        return this.__subscribeType;
    }
    private __timeAmount: number;
    public get timeAmount() {
        return this.__timeAmount;
    }
    private __customerSurname: string
    public get customerSurname() {
        return this.__customerSurname;
    }
    private __customerName: string
    public get customerName() {
        return this.__customerName
    }
    private __bussinessName: string
    public get bussinessName() {
        return this.__bussinessName;
    }
    private __email: string;
    public get email() {
        return this.__email;
    }

    constructor(subscribeType: PackageTypes, timeAmount: number, customerName: string, customerSurname: string, bussinessName: string, email: string) {
        super()
        this.__timeAmount = timeAmount;
        this.__subscribeType = subscribeType;
        this.__customerName = customerName;
        this.__customerSurname = customerSurname;
        this.__bussinessName = bussinessName;
        this.__email = email;
    }

}
export class WaitedPermissionRequest extends AccessPermissionRequest {

    private __state: RequestState
    private __requestId: string
    public get requestId() {
        return this.__requestId;
    }
    public get state() {
        return this.__state;
    }

    constructor(subscribeType: PackageTypes,
        timeAmount: number,
        customerName: string,
        customerSurname: string,
        bussinessName: string,
        email: string,
        requestId: string
    ) {
        super(subscribeType, timeAmount, customerName, customerSurname, bussinessName, email)
        this.__requestId = requestId
        this.__state = RequestState.Waited
    }

    Reject(): RejectedPermissionResult {
        this.__state = RequestState.Answered
        return new RejectedPermissionResult(this)
    }
    Accept(): AcceptedPermissionResult {
        this.__state = RequestState.Answered
        return new AcceptedPermissionResult(this)
    }
    Timeout(): TimeoutPermissionResult {
        this.__state = RequestState.Timeout
        return new TimeoutPermissionResult(this)
    }
}



