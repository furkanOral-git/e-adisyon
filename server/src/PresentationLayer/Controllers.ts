import { Router } from "express";
import { AuthenticationService } from "../ApplicationLayer/Authentication";
import { BuyRequest, LoginRequest, RegisterRequest } from "./Requests";

import { AuthenticationResponse, FailedAuthenticationResponse, SucceedAuthenticationResponse } from "../ApplicationLayer/Responses";
import { BuyAppWorkFlowAsync, ConstructAppWorkFlow } from "../ApplicationLayer/Workflows";
import { AuthenticationError, AuthenticationUnknownRequestType } from "../ApplicationLayer/Errors";
import { Server } from "socket.io";
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

        let requestData = ""
        req.on("data", (chunk: any) => {
            requestData += chunk.toString()
        })

        req.on("end", () => {
            const request = JSON.parse(requestData)
            if (request instanceof SucceedAuthenticationResponse) {
                const response = ConstructAppWorkFlow(request, server);
                res.status(200).json(response);
            }
            else {
                res.status(401).json("Not Authorized")
            }

        })
    })

}
//1
export function AddBuyAppController() {


    buyAppController.post("/", (req, res) => {

        let requestData = ""
        req.on("data", (chunk: any) => {
            requestData += chunk.toString()
        })
        req.on("end", async () => {

            const requestObject = JSON.parse(requestData)
            if (requestObject instanceof BuyRequest) {
                const response = await BuyAppWorkFlowAsync(requestObject).catch((err) => {
                    res.status(400).json(err)
                })
                res.status(200).json(response)
            }
            else {
                res.status(400)
            }

        })
    })
}





