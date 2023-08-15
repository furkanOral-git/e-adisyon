import { BuyResponse } from "../ApplicationLayer/Responses";

export class LoginRequest {


    private __email: string;
    private __password: string;


    public get email() {
        return this.__email;
    }
    public get password() {
        return this.__password;
    }

    constructor(email: string, password: string) {

        this.__email = email;
        this.__password = password;
    }
}
export class RegisterRequest {

    private __email: string;
    private __name: string;
    private __surname: string;
    private __password: string;
    private __response: BuyResponse

    public get email() {
        return this.__email;
    }
    public get name() {
        return this.__name;
    }
    public get surname() {
        return this.__surname;
    }
    public get response() {
        return this.__response
    }
    public get password() {
        return this.__password;
    }


    constructor(response: BuyResponse, email: string, name: string, surname: string, password: string) {

        this.__email = email;
        this.__response = response;
        this.__name = name;
        this.__surname = surname;
        this.__password = password;
    }

}
export class BuyRequest {

    private __id: number
    private __packageType: PackageTypes
    public get packageType() {
        return this.__packageType;
    }
    private __amount: number;
    public get amount() {
        return this.__amount;
    }
    private __customerName: string
    public get customerName() {
        return this.__customerName
    }
    private __customerSurname: string
    public get customerSurname() {
        return this.__customerSurname;
    }
    private __bussinessName: string
    public get bussinessName() {
        return this.__bussinessName;
    }

    constructor(id: number, packageType: PackageTypes, amount: number, customerName: string, customerSurname: string, bussinessName: string) {

        this.__id = id
        this.__amount = amount;
        this.__packageType = packageType;
        this.__customerName = customerName;
        this.__customerSurname = customerSurname;
        this.__bussinessName = bussinessName;
    }

}

export enum PackageTypes {
    Trial,
    Monthly,
    Yearly
}
