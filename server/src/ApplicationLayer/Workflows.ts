import { Bussiness } from "../DomainLayer/Domain.Customer/Customer.AggregateRoot";
import { AcountManagerId, BussinessId, ReferenceKey } from "../DomainLayer/Domain.Customer/Customer.ValueObjects";
import { TableLayout } from "../DomainLayer/Domain.Order/Order.AggregateRoot";
import { IOServer } from "../DomainLayer/Domain.Room/Room.AggregateRoot";
import { BuyRequest, PackageTypes } from "../PresentationLayer/Requests";
import { BussinessConfigFile } from "./Entities";
import { ConfigRepository } from "./Repositories";
import { AppResponse, SucceedAuthenticationResponse } from "./Responses";
import { RondomIdGenarator } from "./Tools";
import { AcountManager } from "../DomainLayer/Domain.Customer/Customer.Entities";
import { Menu } from "../DomainLayer/Domain.Product/Product.AggregateRoot";


export async function BuyAppWorkFlowAsync(request: BuyRequest): Promise<void> {

    return new Promise<void>((resolve, reject) => {

        //burada bir socket alanının dinlendiğini varsayalım cevap beklediği düşünelim. kabul edildiğinde şunlar çalışacak
        //////// 
        const repo = ConfigRepository.GetRepo();
        const key = ReferenceKey.Create(request.packageType, request.amount)

        const bussiness = new Bussiness
            (
                new BussinessId(RondomIdGenarator.CreateId(15))
                , RondomIdGenarator.CreateId(30)
                , request.bussinessName
                , key);

        const acountManager = new AcountManager(new AcountManagerId(RondomIdGenarator.CreateId(15)), request.customerName, request.customerSurname)
        bussiness.addTo(acountManager);
        const config = new BussinessConfigFile(bussiness, new TableLayout(), new Menu())
        repo.add(config)
        resolve()
    })

}
//register
export function ConstructAppWorkFlow(registerResponse: SucceedAuthenticationResponse, ioServerAggregate: IOServer): string  {

    const repo = ConfigRepository.GetRepo();
    const bussinessConfig = repo.getBy(c => c.bussiness.id.IsEqualTo<BussinessId>(registerResponse.bussinessId))
    //tableLayout ve Menu itemlerı döndürülecek,room oluşturulacak ve Server'a eklenecek
    //const room = new Room();
    return ""
}


// export function GetTablesWorkFlow(bussinessId: BussinessId, size: number, initialTableNumber: number): TableLayout {

//     const repo = ConfigRepository.GetRepo();
//     const result = repo.getBy(e => e.bussiness.id.IsEqualTo<BussinessId>(bussinessId))
//     if (!!result.__tableLayout) {
//         return result.__tableLayout;
//     }

//     const layout = new TableLayout()
//     for (let index: number = initialTableNumber; index <= initialTableNumber + size; index++) {

//         const id = new TableId(RondomIdGenarator.CreateId(7))
//         const table = new EmptyTable(id, new TableNumber(index))
//         layout.addTo(table)

//     }
//     result.__tableLayout = layout;
//     return layout
// }


