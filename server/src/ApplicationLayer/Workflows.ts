import { Bussiness } from "../DomainLayer/Domain.AcountManager/AcountManager.AggregateRoot";
import { AcountManagerId, BussinessId } from "../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects";
import { IOServer } from "../DomainLayer/Domain.Room/Room.AggregateRoot";
import { AccessPermissionRequest, EmploeeSocketConnectionRequest, GetSocketConnectionRequest, LoginRequest, RegisterRequest } from "../PresentationLayer/Requests";
import { AcceptedPermissionResponse, DeniedPermissionResponse, PermissionResponse } from "./Responses";
import { RondomIdGenarator } from "./Tools";
import { AcountManager } from "../DomainLayer/Domain.AcountManager/AcountManager.Entities";
import { AuthenticationResponse, AuthenticationService, FailedAuthenticationResponse, SucceedAuthenticationResponse } from "./services/Authentication";
import { AppContextManagementService, UserService } from "./services/Services";
import { BussinessConfigRepository, BussinessRepository, JWTRepository } from "./Repositories";
import { IOClientInterface } from "../DomainLayer/Domain.Room/Room.Abstracts";
import { AccessPermissionRequestManager } from "./services/Security";
import { RoomContext } from "./room/RoomContext";
import { Participant, ParticipantClientModel } from "../DomainLayer/Domain.Room/Room.Entities";
import { ParticipantId } from "../DomainLayer/Domain.Room/Room.ValueObjects";
import { IONameSpace } from "../DomainLayer/Common/Common.ValueObjects";
import { NodeMailer } from "../InfrastructureLayer/NodeMailer";
import { VertificationService } from "../InfrastructureLayer/VertificationService";




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
                const vertificationCode = RondomIdGenarator.CreateId(4).toUpperCase();
                NodeMailer.SendVertificationMail(request.email, "Gmail", vertificationCode)
                const IsVerified = await VertificationService.WaitForVertification(vertificationCode, requestId, request.email)
                if (!IsVerified) {
                    reject("Geçersiz Email")
                }
                if (!AccessPermissionRequestManager.VerifyResponseAndClearIfExist(requestId)) {
                    reject("Kabul Edilmeyen İstek")
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
    //first time createdRoomContext
    static async CreateRoomContextRequestWorkFlow(request: GetSocketConnectionRequest, ioServer: IOServer): Promise<IOClientInterface> {

        return new Promise<IOClientInterface>((resolve, reject) => {
            //Auth kontrolleri...
            try {

                const contextService = AppContextManagementService.GetService(ioServer);
                const configRepo = BussinessConfigRepository.GetRepo();
                let config = configRepo.getBy(c => c.id.IsEqualTo(request.bussinessId))
                let context: RoomContext
                const bussiness = BussinessRepository.GetRepo().getBy(e => e.id.IsEqualTo(request.bussinessId))

                if (!!bussiness) {

                    if (!!config) {
                        //daha önce oda açılmış ve gün başlatma yapılacak
                        context = contextService.CreateRoomContextWithConfig(config, bussiness, request.roomId);
                    }
                    else {
                        //ilk defa
                        context = contextService.CreateRoomContext(bussiness);

                    }
                    //client oluşturulacak ve context nesnesinin içerisindeki room nesnesine eklencek ardından da resolve edilecek
                    const acountManager = bussiness.getBy(e => e.id.IsEqualTo(request.acountManagerId))
                    if (!!acountManager) {

                        const nameSpace = new IONameSpace(bussiness.id.value);
                        const participantModel = new ParticipantClientModel(acountManager.name, nameSpace)
                        const participant = new Participant(new ParticipantId(RondomIdGenarator.CreateId(10)), participantModel)
                        context.room.AddParticipant(participant);
                        resolve(participant)
                    }
                    else {
                        reject("Kullanıcı bulunamadı")
                    }
                }
                reject("İşletme Bulunamadı")



            } catch (error) {
                reject(error)
            }

        })

    }
    static async CloseRoomContextRequestWorkFlow() {

    }
    //Socket connection for emploies
    static async JoinToRoomContextRequestWorkFlow(request: EmploeeSocketConnectionRequest, roomId: string): Promise<void> {
        //emploeeSocketConnection isteğinde ad soyad nerede çalıştığı bilgisi alınacak varsa participantId ile gelecek yoksa burada oluşturulacak
        return new Promise<void>((resolve, reject) => {
            //kontroller yapılacak

        })

    }
}







