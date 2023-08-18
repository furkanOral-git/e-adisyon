import { Bussiness } from "../DomainLayer/Domain.Customer/Customer.AggregateRoot";
import { AcountManagerId, BussinessId, ReferenceKey } from "../DomainLayer/Domain.Customer/Customer.ValueObjects";
import { TableLayout } from "../DomainLayer/Domain.Order/Order.AggregateRoot";
import { IOServer, Room } from "../DomainLayer/Domain.Room/Room.AggregateRoot";
import { AccessPermissionRequest, GetAppRequest, LoginRequest, RegisterRequest } from "../PresentationLayer/Requests";
import { BussinessConfigFile } from "./Entities";
import { ConfigRepository } from "./Repositories";
import { AcceptedAccessPermissionResponse, AccessPermissionResponse, AuthenticationResponse, DeniedAccessPermissionResponse, FailedAuthenticationResponse, SucceedAuthenticationResponse } from "./Responses";
import { RondomIdGenarator } from "./Tools";
import { AcountManager } from "../DomainLayer/Domain.Customer/Customer.Entities";
import { Menu } from "../DomainLayer/Domain.Product/Product.AggregateRoot";
import { RoomId } from "../DomainLayer/Domain.Room/Room.ValueObjects";
import { AuthenticationService } from "./services/Authentication";
import { AccessPermissionRequestManager } from "./services/Security";




export async function GetAccessPermissionWorkFlowAsync(request: AccessPermissionRequest, ioServerAggregate: IOServer): Promise<AccessPermissionResponse> {

    return new Promise<AccessPermissionResponse>(async (resolve, reject) => {

        const response = await AccessPermissionRequestManager.SendRequestAndWaitForRepsonseAsync(request);

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
            resolve(new AcceptedAccessPermissionResponse(acountManagerId, bussiness.id, roomId))
        }
        else {
            reject(new DeniedAccessPermissionResponse())
        }

    })

}
export async function RegisterRequestWorkflowAsync(request: RegisterRequest): Promise<AuthenticationResponse> {

    return new Promise<AuthenticationResponse>((resolve, reject) => {
        const response = AuthenticationService.Register(request);
        if (response.__succeed) {

            resolve(response as SucceedAuthenticationResponse)
        }
        else {

            reject(response as FailedAuthenticationResponse)
        }
    })
}
export async function LoginRequestWorkflowAsync(request: LoginRequest): Promise<AuthenticationResponse> {

    return new Promise<AuthenticationResponse>((resolve, reject) => {

        const response = AuthenticationService.Verify(request);
        console.log(`Verify Methodu içerisinde : ${response} objesi`)
        if (response.__succeed) {

            resolve(response as SucceedAuthenticationResponse)
        }
        else {

            reject(response as FailedAuthenticationResponse)
        }
    })

}
export async function ConstructAppWorkFlow(request: GetAppRequest, ioServerAggregate: IOServer) {

    const room = new Room(ioServerAggregate.io, new RoomId(request.roomId))
    ioServerAggregate.addTo(room);


}





