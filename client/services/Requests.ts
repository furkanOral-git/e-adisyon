export class LoginRequest {

    private __securityQuestionAnswer: string;
    private __password: string;

    constructor(answer: string, password: string) {

        this.__securityQuestionAnswer = answer;
        this.__password = password;
    }
}
export class RegisterRequest {

    private __securityQuestion: string;
    private __securityQuestionAnswer: string; //client tarafında tekrarlanacak 2 defa alınacak eşleştirilecek
    private __password: string;//client tarafında tekrarlanacak 2 defa alınacak eşleştirilecek

    constructor(question: string, questionAnswer: string, password: string) {

        this.__securityQuestion = question;
        this.__securityQuestionAnswer = questionAnswer;
        this.__password = password;
    }

}
export class BuyRequest {

    private __packageType: PackageTypes
    private __customerName: string
    private __customerSurname: string
    private __bussinessName: string

    constructor(packageType: PackageTypes, customerName: string, customerSurname: string, bussinessName: string) {

        this.__packageType = packageType;
        this.__customerName = customerName;
        this.__customerSurname = customerSurname;
        this.__bussinessName = bussinessName;
    }


}

export enum PackageTypes {
    Trial,
    ThreeMonthly,
    FiveMonthly,
    Yearly
}


