import { Bussiness } from "../DomainLayer/Domain.AcountManager/AcountManager.AggregateRoot";
import { AcountManagerId, BussinessId } from "../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects";
import { IOServer } from "../DomainLayer/Domain.Room/Room.AggregateRoot";
import { AccessPermissionRequest, EmploeeSocketConnectionRequest, GetSocketConnectionRequest, LoginRequest, RegisterRequest } from "../PresentationLayer/Requests";
import { AcceptedPermissionResponse, DeniedPermissionResponse, PermissionResponse } from "./Responses";
import { RondomIdGenarator } from "./Tools";
import { AcountManager } from "../DomainLayer/Domain.AcountManager/AcountManager.Entities";
import { AuthenticationResponse, AuthenticationService, FailedAuthenticationResponse, SucceedAuthenticationResponse } from "./services/Authentication";
import { AppContextManagementService, UserService } from "./services/Services";
import { BussinessRepository, JWTRepository } from "./Repositories";
import { IOClientInterface } from "../DomainLayer/Domain.Room/Room.Abstracts";
import { AccessPermissionRequestManager } from "./services/Security";




export class WorkflowFunctions {

    static async GetAccessPermissionWorkFlowAsync(request: AccessPermissionRequest): Promise<PermissionResponse> {

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
                bussiness.SignAcountManager(acountManager);
                BussinessRepository.GetRepo().add(bussiness)
                resolve(new AcceptedPermissionResponse(acountManagerId, bussinessId, res))

            }).catch((err => {

                reject(new DeniedPermissionResponse(err))
            }))
        })

    }
    static async RegisterRequestWorkflowAsync(request: RegisterRequest, requestId: string): Promise<AuthenticationResponse> {

        return new Promise<AuthenticationResponse>((resolve, reject) => {
            try {

                if (!AccessPermissionRequestManager.VerifyResponseAndClearIfExist(requestId)) {
                    reject("Geçersiz İstek")
                }
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
                const token = JWTRepository.GetRepo().getBy(jwt => jwt.id.value == user.tokenId);
                if (!!token) {

                    const accessToken = AuthenticationService.CreateAccessToken(user, token)
                    resolve(new SucceedAuthenticationResponse(accessToken.signature))

                }
                else {
                    reject(new FailedAuthenticationResponse("Token Not Found"))
                }

            } catch (error: any) {

                reject(new FailedAuthenticationResponse(error.message))
            }

        })

    }
    //SocketRequestWorkFlow for AcountManagers
    static async CreateAppContextRequestWorkFlow(request: GetSocketConnectionRequest, ioServer: IOServer): Promise<IOClientInterface> {

        return new Promise<IOClientInterface>((resolve, reject) => {
            //Auth kontrolleri...
            try {
                const bussiness = BussinessRepository.GetRepo().getBy(b => b.id.IsEqualTo(request.bussinessId))
                if (!!bussiness) {

                    const appContextManager = AppContextManagementService.GetService(ioServer)
                    const context = appContextManager.GetAppContext(bussiness)
                    resolve(context.room.getFirst());
                }
                else {
                    reject("İşletme bulunamadı")
                }

            } catch (error) {
                reject(error)
            }

        })

    }
    static async CloseAppContextRequestWorkFlow() {

    }
    //Socket connection for emploies
    static async JoinToAppContextRequestWorkFlow(request: EmploeeSocketConnectionRequest, roomId: string): Promise<void> {
        //emploeeSocketConnection isteğinde ad soyad nerede çalıştığı bilgisi alınacak varsa participantId ile gelecek yoksa burada oluşturulacak
        return new Promise<void>((resolve, reject) => {
            //kontroller yapılacak

        })

    }
}







