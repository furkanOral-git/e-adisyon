import { Router } from "express";
import { AccessPermissionRequest, BaseRequest, GetSocketConnectionRequest, LoginRequest, RegisterRequest } from "./Requests";
import { GetAccessPermissionWorkFlowAsync, GetSocketConnectionWorkFlow, LoginRequestWorkflowAsync, RegisterRequestWorkflowAsync } from "../ApplicationLayer/Workflows";
import { IOServer } from "../DomainLayer/Domain.Room/Room.AggregateRoot";
import { AccessPermissionRequestManager } from "../ApplicationLayer/services/Security";

export const registerRequestController = Router()
export const loginRequestController = Router()
export const socketConnectionRequestController = Router()
export const accessPermissionRequestController = Router()
//2
export function AddRegisterRequestController(server: IOServer) {

    registerRequestController.post("/:id", (req, res) => {

        const id = req.params.id
        if (!AccessPermissionRequestManager.VerifyResponseAndClearIfExist(id)) {
            res.status(400).json("Geçersiz istek")
        }
        else {
            processRequest<RegisterRequest>(RegisterRequestWorkflowAsync, req, res, server);
        }
    })
}
export function AddLoginRequestController(server: IOServer) {
    loginRequestController.post("/", (req, res) => {

        processRequest<LoginRequest>(LoginRequestWorkflowAsync, req, res, server)

    })
}
//3
export function AddSocketConnectionRequestController(server: IOServer) {


    socketConnectionRequestController.post("/:token", (req, res) => {
        
        req.params.token
        processRequest<GetSocketConnectionRequest>(GetSocketConnectionWorkFlow, req, res, server)
    })

}
//1

export function AddAccessPermissionRequestController(server: IOServer) {


    accessPermissionRequestController.post("/", (req, res) => {

        processRequest<AccessPermissionRequest>(GetAccessPermissionWorkFlowAsync, req, res, server,)
    })
}

async function processRequest<TRequest extends BaseRequest>(
    workflowFunction: (request: TRequest, server: IOServer) => Promise<any>,
    req: any,
    res: any,
    server: IOServer
) {
    let requestData = ""
    req.on("data", (chunk: any) => {
        requestData += chunk.toString()
    })
    req.on("end", async () => {

        const requestObject = JSON.parse(requestData) as TRequest;

        if (requestObject) {

            const response = await workflowFunction(requestObject, server).catch((err: Error) => {
                res.status(400).json(err.message);
            });

            res.status(200).json(response);
        } else {
            res.status(400).json("Unvalid JSON object Type");
        }
    })

}




