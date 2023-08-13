import { ReferenceKey } from "../DomainLayer/Domain.Customer/Customer.ValueObjects";




export class AuthenticationResponse{

    __succeed: boolean
    __message: string

    constructor(succeed: boolean, message: string) {

        this.__message = message;
        this.__succeed = succeed;
    }
}
export class ErrorAuthenticationResponse extends AuthenticationResponse {

    constructor(message: string) {
        super(false, message)
    }
}
export class SucceedAuthenticationResponse extends AuthenticationResponse {

    private __key: ReferenceKey

    constructor(key: ReferenceKey, message: string) {
        super(true, message)
        this.__key = key;
    }
}
