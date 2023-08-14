import { Router } from "express";
import { AuthenticationService } from "../ApplicationLayer/Authentication";
import { BuyRequest, LoginRequest, RegisterRequest } from "./Requests";

import { AuthenticationResponse, SucceedAuthenticationResponse } from "../ApplicationLayer/Responses";
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
            let result: AuthenticationResponse | null;

            if (data instanceof RegisterRequest) {

                result = AuthenticationService.Register(data)
            }
            else if (data instanceof LoginRequest) {

                result = AuthenticationService.Verify(data)
            }
            else {
                throw new AuthenticationUnknownRequestType("Bilinmeyen türde bir istek yapıldı!")
            }
            if (!!result) {

                if (!result.__succeed) {

                    throw new AuthenticationError(result.__message)
                }
                const succeedResult = result as SucceedAuthenticationResponse
                res.status(200).json(succeedResult)
            }

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
                //res.status(200).json(response);
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
                await BuyAppWorkFlowAsync(requestObject)
                    .then(() => {

                        res.status(200).json()

                    }, (err) => {
                        res.status(400).json(err.message)
                    })
            }
            else {
                res.status(400)
            }

        })
    })
}





