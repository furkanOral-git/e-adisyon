import { LoginRequest, RegisterRequest } from "../../PresentationLayer/Requests";
import { EmailHasBeenUsedAlready } from "../Errors";
import { JWTRepository, UserRepository } from "../Repositories";
import { RondomIdGenarator } from "../Tools";
import { SecurityManager, User } from "./Security";
import { UserService } from "./Services";


export class AuthenticationService {

    private static __repo: JWTRepository = JWTRepository.GetRepo()
    private static __userService: UserService = UserService.GetService();

    public static Sign(req: RegisterRequest): AuthenticationResponse {

        try {

            const user = this.__userService.Register(req)
            const refreshToken = this.CreateRefreshToken(user, req.permission.results.subscribeType, req.permission.results.timeAmount)
            const accessToken = this.CreateAccessToken(user, refreshToken)
            return new SucceedAuthenticationResponse(accessToken?.signature, refreshToken.signature)

        } catch (error: any) {

            if (error instanceof EmailHasBeenUsedAlready) {

                return new FailedAuthenticationResponse("Email Zaten Kullanılıyor.")
            }
            return new FailedAuthenticationResponse("Sisteme Kayıt Edilirken Bir Sorun Oluştu!")
        }


    }

    static VerifyToken(subject: string, token: JWTToken): boolean {


        const payload = token.signature.split(".")[1];
        const decodedPayload = SecurityManager.base64UrlDecode(payload)
        const jsonPayload = JSON.parse(decodedPayload) as { sub: string, name: string, exp: number };

        if (!this.IsExpired(jsonPayload)) {
            if (subject == jsonPayload.sub) {
                return true;
            }
            else {
                throw new Error("Token ve subject uyuşmuyor")
            }
        }
        else {
            return false;
        }

    }
    private static IsExpired(payload: { "sub": string, "name": string, "exp": number }): boolean {
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime >= payload.exp
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
    public static CreateAccessToken(user: User, refreshToken: JWTToken): JWTToken {

        this.VerifyToken(user.bussinessId.value, refreshToken)

        const payload = {
            sub: user.__id.value,
            name: user.name,
            exp: this.ExpireyForHour(1)
        }
        const header = {
            alg: "sha256",
            typ: "JWT"
        }
        const token = new JWTToken(RondomIdGenarator.CreateId(10), header, payload)
        this.__repo.add(token);
        return token;


    }
    private static CreateRefreshToken(user: User, packageType: PackageTypes, amount: number): JWTToken {

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

            sub: user.bussinessId.value,
            name: user.name,
            exp: countDay(),
            pack: packageType
        }
        const header = {
            alg: "sha256",
            typ: "JWT"
        }
        const refreshToken = new JWTToken(user.tokenId, header, payload)
        this.__repo.add(refreshToken);
        return refreshToken

    }


}
export class JWTToken {

    private __tokenId: string

    private __header: { "alg": string, "typ": string }

    private __payload: { "sub": string, "name": string, "exp": number }

    private __signature: string

    public get tokenId() {
        return this.__tokenId;
    }
    public get signature() {
        return this.__signature;
    }

    constructor(tokenId: string, header: { "alg": string, "typ": string }, payload: { "sub": string, "name": string, "exp": number }) {

        this.__tokenId = tokenId;
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
