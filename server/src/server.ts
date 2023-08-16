import express from "express";
import { Server } from "socket.io";
import { createServer } from "http"
import { exceptionMiddleware } from "./middleware";
import { AddAppRequestController, AddBuyAppController, AddLoginRequestController, AddRegisterRequestController, appRequestController, buyAppController, loginRequestController, registerRequestController } from "./PresentationLayer/Controllers";
import { IOServer } from "./DomainLayer/Domain.Room/Room.AggregateRoot";



export default class ServerManagement {

    private static __: IOServer


    public static buildIoServer() {

        const app = express()
        const httpServer = createServer(app);
        app.use(exceptionMiddleware)
        app.use("/register", registerRequestController)
        app.use("/login", loginRequestController)
        app.use("/buy", buyAppController)
        app.use("/app", appRequestController)
        ServerManagement.__ = new IOServer(new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["POST", "GET"]
            }
        }));
        this.AddControllers()
        httpServer.listen(3001, "localhost");
    }


    private static AddControllers() {

        AddBuyAppController(this.__);
        AddLoginRequestController(this.__);
        AddRegisterRequestController(this.__);
        AddAppRequestController(this.__);
    }


}




