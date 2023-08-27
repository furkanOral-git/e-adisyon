import { Router } from "express";
import { AccessPermissionRequest, BaseRequest, EmploeeSocketConnectionRequest, GetSocketConnectionRequest, LoginRequest, RegisterRequest } from "./Requests";
import { IOServer } from "../DomainLayer/Domain.Room/Room.AggregateRoot";
import { WorkflowFunctions } from "../ApplicationLayer/Workflows";
import { NodeMailer } from "../InfrastructureLayer/NodeMailer";


export const registerRequestController = Router()
export const loginRequestController = Router()
export const socketConnectionRequestController = Router()
export const socketConnectionWithUrlRequestController = Router()
export const accessPermissionRequestController = Router()

//2
export function AddRegisterRequestController() {

    registerRequestController.post("/:id", (req, res) => {
        
        processRequest<RegisterRequest>(WorkflowFunctions.RegisterRequestWorkflowAsync, req, res, req.params.id);
    })
    
}
export function AddLoginRequestController() {

    loginRequestController.post("/", (req, res) => {

        processRequest<LoginRequest>(WorkflowFunctions.LoginRequestWorkflowAsync, req, res, undefined)

    })
}
//3
export function AddSocketConnectionRequestController(ioServer: IOServer) {


    socketConnectionRequestController.post("/", (req, res) => {

        processRequest<GetSocketConnectionRequest>(WorkflowFunctions.CreateRoomContextRequestWorkFlow, req, res, ioServer)
    })

}
export function AddSocketConnectionWithUrlRequestController() {

    socketConnectionWithUrlRequestController.post("/:bussinessId__roomId", (req, res) => {

        processRequest<EmploeeSocketConnectionRequest>(WorkflowFunctions.JoinToRoomContextRequestWorkFlow, req, res, req.params.bussinessId__roomId)
    })
}
//1

export function AddAccessPermissionRequestController() {


    accessPermissionRequestController.post("/", (req, res) => {

        processRequest<AccessPermissionRequest>(WorkflowFunctions.GetAccessPermissionWorkFlowAsync, req, res, undefined)
    })
}

async function processRequest<TRequest extends BaseRequest>(
    workflowFunction: (request: TRequest, params: any | undefined) => Promise<any>,
    req: any,
    res: any,
    params: any | undefined
) {
    let requestData = ""
    req.on("data", (chunk: any) => {
        requestData += chunk.toString()
    })
    req.on("end", async () => {

        const requestObject = JSON.parse(requestData) as TRequest;

        if (requestObject) {

            const response = await workflowFunction(requestObject, params).catch((err: Error) => {
                res.status(400).json(err.message);
            });

            res.status(200).json(response);
        } else {
            res.status(400).json("Unvalid JSON object Type");
        }
    })

}




