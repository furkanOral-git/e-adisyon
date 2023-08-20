import { Bussiness } from "../DomainLayer/Domain.AcountManager/AcountManager.AggregateRoot";
import { AcountManagerId, BussinessId } from "../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects";
import { IOServer } from "../DomainLayer/Domain.Room/Room.AggregateRoot";
import { AccessPermissionRequest, GetSocketConnectionRequest, LoginRequest, RegisterRequest } from "../PresentationLayer/Requests";
import { AcceptedPermissionResponse, DeniedPermissionResponse, PermissionResponse } from "./Responses";
import { RondomIdGenarator } from "./Tools";
import { AcountManager } from "../DomainLayer/Domain.AcountManager/AcountManager.Entities";
import { AuthenticationResponse, AuthenticationService, FailedAuthenticationResponse, SucceedAuthenticationResponse } from "./services/Authentication";
import { AccessPermissionRequestManager, UserService } from "./services/Services";
import { BussinessRepository, JWTRepository } from "./Repositories";



export class WorkflowFunctions {

    static async GetAccessPermissionWorkFlowAsync(request: AccessPermissionRequest, ioServerAggregate: IOServer): Promise<PermissionResponse> {

        return new Promise<PermissionResponse>(async (resolve, reject) => {

            await AccessPermissionRequestManager.SendRequestAndWaitForRepsonseAsync(request).then((res) => {
                const bussinessId = new BussinessId(RondomIdGenarator.CreateId(15))
                const bussiness = new Bussiness
                    (
                        bussinessId,
                        request.bussinessName
                    );

                const acountManagerId = new AcountManagerId(RondomIdGenarator.CreateId(15))
                const acountManager = new AcountManager(acountManagerId, res.accessorName)
                bussiness.addTo(acountManager);
                BussinessRepository.GetRepo().add(bussiness)
                resolve(new AcceptedPermissionResponse(acountManagerId, bussinessId, res))

            }).catch((err => {

                reject(new DeniedPermissionResponse(err))
            }))
        })

    }
    static async RegisterRequestWorkflowAsync(request: RegisterRequest): Promise<AuthenticationResponse> {

        return new Promise<AuthenticationResponse>((resolve, reject) => {
            try {

                const response = AuthenticationService.Sign(request)
                if (response instanceof FailedAuthenticationResponse) {
                    reject(response);
                }
                resolve(response);

            } catch (error: any) {
                reject(new FailedAuthenticationResponse(error.message))
            }

        })
    }
    static async LoginRequestWorkflowAsync(request: LoginRequest): Promise<AuthenticationResponse> {

        return new Promise<AuthenticationResponse>((resolve, reject) => {

            try {

                const user = UserService.GetService().Login(request);
                const token = JWTRepository.GetRepo().getBy(jwt => jwt.tokenId == user.tokenId);
                if (!!token) {

                    const accessToken = AuthenticationService.CreateAccessToken(user, token)
                    resolve(new SucceedAuthenticationResponse(accessToken.signature, token.signature))

                }
                else {
                    reject(new FailedAuthenticationResponse("Token Not Found"))
                }

            } catch (error: any) {

                reject(new FailedAuthenticationResponse(error.message))
            }

        })

    }
    //SocketRequestWorkFlow
    static async GetSocketConnectionWorkFlow(request: GetSocketConnectionRequest, ioServerAggregate: IOServer) {


    }
}







