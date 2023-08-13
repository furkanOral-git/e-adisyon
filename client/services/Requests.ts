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
export class AppRequest {

}
export enum PackageTypes {
    Trial,
    ThreeMonthly,
    FiveMonthly,
    Yearly
}

export async function sendBuyAppRequest(month: number, customerName: string, customerSurname: string, bussinessName: string): Promise<boolean> {

    return new Promise<boolean>(async (resolve, reject) => {
        let request;

        switch (month <= 12) {
            case month == 0:
                request = new BuyRequest(PackageTypes.Trial, customerName, customerSurname, bussinessName)
                break;
            case month == 3:
                request = new BuyRequest(PackageTypes.ThreeMonthly, customerName, customerSurname, bussinessName)
                break;
            case month == 5:
                request = new BuyRequest(PackageTypes.FiveMonthly, customerName, customerSurname, bussinessName)
                break;
            case month == 12:
                request = new BuyRequest(PackageTypes.Yearly, customerName, customerSurname, bussinessName)
                break;
            default:
                reject("Hizmet Dışı Talep")
        }

        const response = await fetch("http://localhost:5000/buy", {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        resolve(await response.json())
    })


}
