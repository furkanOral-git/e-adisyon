import { BussinessId, ReferenceKey } from "../DomainLayer/Domain.Customer/Customer.ValueObjects";

export abstract class AuthenticationResponse {

    __succeed: boolean
    __message: string

    constructor(succeed: boolean, message: string) {

        this.__message = message;
        this.__succeed = succeed;
    }
}
export class AppResponse {


}
export class BuyResponse {

}
export class SucceedAuthenticationResponse extends AuthenticationResponse {

    private __key: ReferenceKey
    private __bussinessId: BussinessId
    
    public get bussinessId() {
        return this.__bussinessId;
    }
    public get key() {
        return this.__key;
    }

    constructor(key: ReferenceKey, bussinessId: BussinessId) {
        super(true, "Başarılı")

        this.__key = key;
        this.__bussinessId = bussinessId
    }
}
