import { AcountManagerId, BussinessId } from "../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects";
import { WaitedPermissionRequest } from "../PresentationLayer/Requests";


export class AppResponse {

    __participantId: string;
    __roomId: string;

    constructor(participantId: string, roomId: string) {

        this.__participantId = participantId;
        this.__roomId = roomId;
    }

}

//RESULTS

export abstract class PermissionResult {

    private __success: boolean
    private __request: WaitedPermissionRequest

    public get id() {
        return this.__request.requestId;
    }
    public get success() {
        return this.__success;
    }
    public get subscribeType() {
        return this.__request.subscribeType
    }
    public get timeAmount() {
        return this.__request.timeAmount
    }
    public get accessorBussinessName() {
        return this.__request.bussinessName
    }
    public get accessorName() {
        return this.__request.customerName
    }
    public get accessorEmail() {
        return this.__request.email
    }

    constructor(request: WaitedPermissionRequest, success: boolean) {
        this.__request = request;
        this.__success = success;
    }

}
export class AcceptedPermissionResult extends PermissionResult {

    constructor(request: WaitedPermissionRequest) {

        super(request, true)
    }
}
export class TimeoutPermissionResult extends PermissionResult {

    private __message: string
    public get message() {
        return this.__message;
    }
    constructor(request: WaitedPermissionRequest) {

        super(request, false)
        this.__message = "Request Timed Out"
    }
}
export class RejectedPermissionResult extends PermissionResult {

    private __message: string
    public get message() {
        return this.__message;
    }
    constructor(request: WaitedPermissionRequest) {

        super(request, false)
        this.__message = "Rejected Request"
    }
}

//RESPONSES

export abstract class PermissionResponse {

    private __results: PermissionResult

    public get results() {
        return this.__results;
    }

    constructor(results: PermissionResult) {

        this.__results = results;
    }
}
export class AcceptedPermissionResponse extends PermissionResponse {

    private __acountManagerId: AcountManagerId
    private __bussinessId: BussinessId

    public get managerId() {
        return this.__acountManagerId;
    }
    public get bussinessId() {
        return this.__bussinessId;
    }

    constructor(acountManagerId: AcountManagerId, bussinessId: BussinessId, permission: AcceptedPermissionResult) {
        super(permission)
        this.__acountManagerId = acountManagerId;
        this.__bussinessId = bussinessId;

    }
}
export class DeniedPermissionResponse extends PermissionResponse {

    constructor(permission: RejectedPermissionResult | TimeoutPermissionResult) {
        super(permission)
    }
}














