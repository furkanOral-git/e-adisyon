import { IDomainEntity } from "../../DomainLayer/Common/Common.Abstracts";
import { AcountManagerId, BussinessId } from "../../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects";
import { AccessPermissionRequest } from "../../PresentationLayer/Requests";
import { ResponseState } from "../Responses";
import { RondomIdGenarator } from "../Tools";
import crypto from 'crypto';


export class User implements IDomainEntity<AcountManagerId>{

    __id: AcountManagerId
    private __bussinessId: BussinessId
    private __name: string
    private __surname: string
    private __email: string
    private __password: string
    private __tokenId: string


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



