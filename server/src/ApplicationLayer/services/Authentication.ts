import { LoginRequest, RegisterRequest } from "../../PresentationLayer/Requests";
import { JWTRepository } from "../Repositories";
import { SecurityManager, User } from "./Security";




export class AuthenticationService {

    private static __repo: JWTRepository = JWTRepository.GetRepo()

    public static Register(req: RegisterRequest): AuthenticationResponse {
        

    }
    public static Verify(): AuthenticationResponse {

    }
    private static ExpireyForHour(hour: number): number {
        //3600 = 1 saat saniye cinsinden
        const expiresIn = 3600 * hour;
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime + expiresIn
    }
    private static ExpireyForDay(day: number): number {

        const expiresIn = 3600 * 24 * day;
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime + expiresIn
    }
    private static CreateAccessToken(user: User, refreshToken: string): string {

        const payload = {
            sub: user.id,
            name: user.name,
            exp: this.ExpireyForHour(1)
        }
        const header = {
            alg: "sha256",
            typ: "JWT"
        }
        const token = new JWTToken(header, payload)
        this.__repo.add(token);
        return token.signature;

    }
    private static CreateRefrenceKeyForDay(user: User, packageType: PackageTypes, amount: number): ReferenceKey {

        const countDay = (): number => {
            if (packageType == PackageTypes.Trial) {
                return this.ExpireyForDay(amount)
            }
            else if (packageType == PackageTypes.Monthly) {
                return this.ExpireyForDay(amount * 30)
            }
            else {
                return this.ExpireyForDay(amount * 365)
            }
        }
        const payload = {
            sub: user.id,
            name: user.name,
            exp: countDay()
        }
        const header = {
            alg: "sha256",
            typ: "JWT"
        }
        const token = new JWTToken(header, payload)
        this.__repo.add(token);
        return ReferenceKey.Create(user.bussinessId, packageType, amount)
    }


}
export class JWTToken {

    private __header: { "alg": string, "typ": string }
    public get header() {
        return this.__header;
    }
    private __payload: { "sub": string, "name": string, "exp": number }
    public get payload() {
        return this.__payload;
    }
    private __signature: string
    public get signature() {
        return this.__signature;
    }

    constructor(header: { "alg": string, "typ": string }, payload: { "sub": string, "name": string, "exp": number }) {

        this.__header = header;
        this.__payload = payload;
        const base64Header = SecurityManager.base64UrlEncode(this.__header)
        const base64Payload = SecurityManager.base64UrlEncode(this.__payload);
        this.__signature = SecurityManager.hashString(base64Header + "." + base64Payload + "." + process.env.AUTH__SECRET__KEY, header.alg)
    }
}
export enum PackageTypes {
    Trial = "TRIAL",
    Monthly = "MONTHLY",
    Yearly = "YEARLY"
}
export class ReferenceKey {

    private __expireyDate: Date
    private __customerId: string
    private __packageType: PackageTypes

    public get packageType() {
        return this.__packageType
    }
    public get customerId() {
        return this.__customerId;
    }
    public get ExpireyDate() {
        return this.__expireyDate;
    }
    private constructor(customerId: string, packageType: PackageTypes, expireyDate: Date) {

        this.__packageType = packageType;
        this.__customerId = customerId;
        this.__expireyDate = expireyDate;
    }

    public static Create(customerId: string, type: PackageTypes, amount: number): ReferenceKey {
        switch (type) {
            case PackageTypes.Trial:
                return this.create(customerId, type, amount)
            case PackageTypes.Monthly:
                return this.createForMonth(customerId, type, amount)
            case PackageTypes.Yearly:
                return this.createForYear(customerId, type, amount);
            default:
                throw new Error("Bir Hata Oluştu")
        }
    }
    public isExpired(): boolean {
        const currentDate = new Date();
        return this.ExpireyDate < currentDate
    }
    private static create(customerId: string, packageType: PackageTypes, day: number): ReferenceKey {

        const today = new Date()
        const expireyDate = new Date()
        expireyDate.setDate(today.getDate() + day)
        return new ReferenceKey(customerId, packageType, expireyDate)
    }
    private static createForMonth(customerId: string, packageType: PackageTypes, month: number): ReferenceKey {

        return this.create(customerId, packageType, 30 * month)
    }
    private static createForYear(customerId: string, packageType: PackageTypes, year: number): ReferenceKey {

        return this.create(customerId, packageType, 365 * year)
    }
}
export abstract class AuthenticationResponse {

    private __succeed: boolean
    private __message: string
    private __accessToken: string | undefined
    private __refreshToken: string | undefined

    public get accessToken() {
        return this.__accessToken;
    }
    public get refreshToken() {
        return this.__refreshToken;
    }
    public get succeed() {
        return this.__succeed;
    }
    public get message() {
        return this.__message;
    }
    constructor(succeed: boolean, accessToken: string | undefined, refreshToken: string | undefined, message: string = "") {

        this.__message = message;
        this.__succeed = succeed;
        this.__accessToken = accessToken;
        this.__refreshToken = refreshToken;
    }
}

export class SucceedAuthenticationResponse extends AuthenticationResponse {


    constructor(accessToken: string | undefined, refreshToken: string | undefined) {
        super(true, accessToken, refreshToken)
    }
}
export class FailedAuthenticationResponse extends AuthenticationResponse {

    constructor(message: string) {

        super(false, undefined, undefined, message)
    }
}
