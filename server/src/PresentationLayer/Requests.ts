export class LoginRequest {

    private __bussinessName: string;
    private __name: string;
    private __surname: string;
    private __securityQuestionAnswer: string;
    private __password: string;

    constructor(bussinessName: string, name: string, surname: string, answer: string, password: string) {

        this.__bussinessName = bussinessName;
        this.__name = name;
        this.__surname = surname;
        this.__securityQuestionAnswer = answer;
        this.__password = password;
    }
}
export class RegisterRequest {

    private __securityQuestion: string;
    private __securityQuestionAnswer: string; //client tarafında tekrarlanacak 2 defa alınacak eşleştirilecek
    private __password: string;//client tarafında tekrarlanacak 2 defa alınacak eşleştirilecek
    private __request: BuyRequest
    
    constructor(request: BuyRequest, question: string, questionAnswer: string, password: string) {

        this.__request = request;
        this.__securityQuestion = question;
        this.__securityQuestionAnswer = questionAnswer;
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
