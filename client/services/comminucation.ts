export class AuthRequest {

    private __bussinessName: string;
    private __name: string;
    private __surname: string
    private __password: string


    public get name() {
        return this.__name;
    }
    public get surname() {
        return this.__surname;
    }
    public get password() {
        return this.__password;
    }
    constructor(bussinessName: string, name: string, surname: string, password: string) {

        this.__bussinessName = bussinessName;
        this.__name = name;
        this.__surname = surname;
        this.__password = password;
    }
}
export class AuthResponse {

    private __succeed: boolean;
    private __message: string;
    
    public get Succeed() {
        return this.__succeed;
    }
    public get Message() {
        return this.__message;
    }
    constructor(succeed: boolean, message: string) {

        this.__message = message;
        this.__succeed = succeed;
    }
}