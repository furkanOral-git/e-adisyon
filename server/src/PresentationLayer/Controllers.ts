import { Router } from "express";
import { AuthenticationService } from "../ApplicationLayer/Authentication";
import { BuyRequest, LoginRequest, RegisterRequest } from "./Requests";

import { AuthenticationResponse, SucceedAuthenticationResponse } from "../ApplicationLayer/Responses";
import { BuyAppWorkFlowAsync } from "../ApplicationLayer/Workflows";
import { AuthenticationError, AuthenticationUnknownRequestType } from "../ApplicationLayer/Errors";

export const authenticationController = Router()
export const appRequestController = Router()
export const buyAppController = Router()

export function AddAuthenticationController() {

    authenticationController.post("/", (req, res) => {

        let requestData: "";
        req.on("data", (chunk: any) => {
            requestData += chunk.toString();
        })
        req.on("end", () => {
            const data = JSON.parse(requestData)
            let result: AuthenticationResponse | null;

            if (data == typeof (RegisterRequest)) {

                result = AuthenticationService.Register(data as RegisterRequest)
            }
            else if (data == typeof (LoginRequest)) {

                result = AuthenticationService.Verify(data as LoginRequest)
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
export function AddAppRequestController() {
    //authenticate edildi mi kontrol edilecek ya da özel Url ile mi geliyor bu kontrol edilecek

    appRequestController.post("/", (req, res) => {

        let requestData = ""
        req.on("data", (chunk: any) => {
            requestData += chunk.toString()
        })
        req.on("end", () => {

            console.log("çalıştı")

        })
    })

}
export function AddBuyAppController() {


    buyAppController.post("/", (req, res) => {

        let requestData = ""
        req.on("data", (chunk: any) => {
            requestData += chunk.toString()
        })
        req.on("end", async () => {

            const requestObject = JSON.parse(requestData)
            const permission = await BuyAppWorkFlowAsync(requestObject as BuyRequest)

            if (!permission) {
                res.status(400).json("Cevap Alınamadı !")
            }
            else {
                res.status(200).json(permission)
            }

        })
    })
}





