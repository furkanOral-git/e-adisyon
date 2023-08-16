import { Bussiness } from "../DomainLayer/Domain.Customer/Customer.AggregateRoot";
import { AcountManagerId, BussinessId, ReferenceKey } from "../DomainLayer/Domain.Customer/Customer.ValueObjects";
import { TableLayout } from "../DomainLayer/Domain.Order/Order.AggregateRoot";
import { IOServer, Room } from "../DomainLayer/Domain.Room/Room.AggregateRoot";
import { BuyRequest, GetAppRequest } from "../PresentationLayer/Requests";
import { BussinessConfigFile } from "./Entities";
import { ConfigRepository } from "./Repositories";
import { BuyResponse, SucceedAuthenticationResponse } from "./Responses";
import { RondomIdGenarator } from "./Tools";
import { AcountManager } from "../DomainLayer/Domain.Customer/Customer.Entities";
import { Menu } from "../DomainLayer/Domain.Product/Product.AggregateRoot";
import { RoomId } from "../DomainLayer/Domain.Room/Room.ValueObjects";



export async function BuyAppWorkFlowAsync(request: BuyRequest, ioServerAggregate: IOServer): Promise<BuyResponse> {


    return new Promise<BuyResponse>((resolve, reject) => {

        const requestId = RondomIdGenarator.CreateId(7)
        ioServerAggregate.listen(`buy`, (response: boolean) => {

            if (response) {
                const repo = ConfigRepository.GetRepo();
                const key = ReferenceKey.Create(request.packageType, request.amount)
                const roomId = RondomIdGenarator.CreateId(30)
                const bussiness = new Bussiness
                    (
                        new BussinessId(RondomIdGenarator.CreateId(15))
                        , roomId
                        , request.bussinessName
                        , key);

                const acountManagerId = new AcountManagerId(RondomIdGenarator.CreateId(15))
                const acountManager = new AcountManager(acountManagerId, request.customerName, request.customerSurname)
                bussiness.addTo(acountManager);
                const config = new BussinessConfigFile(bussiness, new TableLayout(), new Menu())
                repo.add(config)
                resolve(new BuyResponse(acountManagerId, bussiness.id, roomId))
            }
            else {
                reject()
            }


        })
        ioServerAggregate.stopListen("buy")
        //burada bir socket alanının dinlendiğini varsayalım cevap beklediği düşünelim. kabul edildiğinde şunlar çalışacak
        //////// 

    })

}

export async function ConstructAppWorkFlow(response: GetAppRequest, ioServerAggregate: IOServer) {

    const room = new Room(ioServerAggregate.io, new RoomId(response.roomId))
    ioServerAggregate.addTo(room);

}





