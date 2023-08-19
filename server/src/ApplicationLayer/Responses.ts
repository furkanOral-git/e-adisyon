import { AcountManagerId, BussinessId } from "../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects";



export class AppResponse {

    __participantId: string;
    __roomId: string;

    constructor(participantId: string, roomId: string) {

        this.__participantId = participantId;
        this.__roomId = roomId;
    }

}
export abstract class AccessPermissionResponse {
    private __permissionStatus: boolean;
    public get status() {
        return this.__permissionStatus;
    }
    constructor(permissionStatus: boolean) {
        this.__permissionStatus = permissionStatus;
    }
}
export class AcceptedAccessPermissionResponse extends AccessPermissionResponse {

    private __acountManagerId: AcountManagerId;
    private __bussinessId: BussinessId;
    private __roomId: string

    public get acountManagerId() {
        return this.__acountManagerId;
    }
    public get bussinessId() {
        return this.__bussinessId;
    }
    public get roomId() {
        return this.__roomId;
    }
    constructor(acountManagerId: AcountManagerId, bussinessId: BussinessId, roomId: string) {
        super(true)
        this.__roomId = roomId;
        this.__acountManagerId = acountManagerId;
        this.__bussinessId = bussinessId;

    }

}
export class DeniedAccessPermissionResponse extends AccessPermissionResponse {
    constructor() {
        super(false)
    }
}



