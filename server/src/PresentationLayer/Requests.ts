import { AcceptedPermissionResponse, AcceptedPermissionResult, RejectedPermissionResult, TimeoutPermissionResult } from "../ApplicationLayer/Responses";
import { SucceedAuthenticationResponse, PackageTypes } from "../ApplicationLayer/services/Authentication";


export abstract class BaseRequest {



}
export class GetSocketConnectionRequest extends BaseRequest {



    constructor(res: SucceedAuthenticationResponse) {
        super()
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



