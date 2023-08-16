import { Router } from "express";
import { AuthenticationService } from "../ApplicationLayer/Authentication";
import { BaseRequest, BuyRequest, GetAppRequest, LoginRequest, RegisterRequest } from "./Requests";
import { AuthenticationResponse, FailedAuthenticationResponse, SucceedAuthenticationResponse } from "../ApplicationLayer/Responses";
import { BuyAppWorkFlowAsync, ConstructAppWorkFlow } from "../ApplicationLayer/Workflows";
import { AuthenticationError } from "../ApplicationLayer/Errors";
import { IOServer } from "../DomainLayer/Domain.Room/Room.AggregateRoot";

export const authenticationController = Router()
export const appRequestController = Router()
export const buyAppController = Router()
//2
export function AddAuthenticationController() {

    authenticationController.post("/", (req, res) => {

        let requestData: "";
        req.on("data", (chunk: any) => {
            requestData += chunk.toString();
        })
        req.on("end", () => {
            const data = JSON.parse(requestData)
            let result: AuthenticationResponse;

            if (data instanceof RegisterRequest) {

                result = AuthenticationService.Register(data)
            }
            else if (data instanceof LoginRequest) {

                result = AuthenticationService.Verify(data)
            }
            else {
                result = new FailedAuthenticationResponse("Bilinmeyen istek yapısı")
                res.status(400).json(result)
            }

            if (!result.__succeed) {

                res.status(400).json(new AuthenticationError())
            }
            const succeedResult = result as SucceedAuthenticationResponse
            res.status(200).json(succeedResult)

        })
    })
}
//3
export function AddAppRequestController(server: IOServer) {


    appRequestController.post("/", (req, res) => {

        processRequest<GetAppRequest>(ConstructAppWorkFlow, req, res, server, "SucceedAuthenticationResponse")
    })

}
//1

export function AddBuyAppController(server: IOServer) {


    buyAppController.post("/", (req, res) => {

        processRequest<BuyRequest>(BuyAppWorkFlowAsync, req, res, server, "BuyRequest")
    })
}
async function processRequest<TRequest extends BaseRequest>(
    workflowFunction: (request: TRequest, server: IOServer) => Promise<any>,
    req: any,
    res: any,
    server: IOServer,
    expectedTypeName: string
) {
    let requestData = ""
    req.on("data", (chunk: any) => {
        requestData += chunk.toString()
    })
    req.on("end", async () => {

        const requestObject = JSON.parse(requestData);

        if (requestObject.type === expectedTypeName) {

            const response = await workflowFunction(requestObject as TRequest, server).catch((err) => {
                res.status(400).json(err);
            });

            res.status(200).json(response);
        } else {
            res.status(400).json("Unvalid JSON object Type");
            console.log("Geçersiz JSON nesnesi");
        }
    })

}



