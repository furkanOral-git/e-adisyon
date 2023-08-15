import { AcountManagerId, BussinessId, ReferenceKey } from "../DomainLayer/Domain.Customer/Customer.ValueObjects";



export class AppResponse {

    __participantId: string;
    __roomId: string;

    constructor(participantId: string, roomId: string) {

        this.__participantId = participantId;
        this.__roomId = roomId;
    }

}
export class BuyResponse {

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
        this.__roomId = roomId;
        this.__acountManagerId = acountManagerId;
        this.__bussinessId = bussinessId;

    }

}

export abstract class AuthenticationResponse {

    __succeed: boolean
    __message: string

    constructor(succeed: boolean, message: string = "") {

        this.__message = message;
        this.__succeed = succeed;
    }
}

export class SucceedAuthenticationResponse extends AuthenticationResponse {
    private __roomId: string
    public get roomId() {
        return this.__roomId
    }

    constructor(roomId: string) {
        super(true)
        this.__roomId = roomId;
    }
}
export class FailedAuthenticationResponse extends AuthenticationResponse {

    constructor(message: string) {
        super(false, message)
    }
}

