import { PackageTypes, BuyRequest } from "./Requests";

export async function sendBuyAppRequest(month: number, customerName: string, customerSurname: string, bussinessName: string): Promise<boolean> {

    return new Promise<boolean>(async (resolve, reject) => {
        let packageType: PackageTypes = PackageTypes.Trial

        switch (month <= 12) {
            case month == 0:
                packageType = PackageTypes.Trial
                break;
            case month == 3:
                packageType = PackageTypes.ThreeMonthly
                break;
            case month == 5:
                packageType = PackageTypes.FiveMonthly
                break;
            case month == 12:
                packageType = PackageTypes.Yearly
                break;
            default:
                reject("Hizmet Dışı Talep")
        }
        const request = new BuyRequest(packageType, customerName, customerSurname, bussinessName)
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
export function sendCreateTablesRequest(){
    
}