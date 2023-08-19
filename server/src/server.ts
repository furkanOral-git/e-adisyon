import express from "express";
import { Server } from "socket.io";
import { createServer } from "http"
import { exceptionMiddleware } from "./middleware";
import { AddAccessPermissionRequestController, AddLoginRequestController, AddRegisterRequestController, AddSocketConnectionRequestController, accessPermissionRequestController, loginRequestController, registerRequestController, socketConnectionRequestController } from "./PresentationLayer/Controllers";
import { IOServer } from "./DomainLayer/Domain.Room/Room.AggregateRoot";

export default class ServerManagement {

    private static __: IOServer


    public static buildIoServer() {

        const app = express()
        const httpServer = createServer(app);
        app.use(exceptionMiddleware)
        app.use("/register", registerRequestController)
        app.use("/login", loginRequestController)
        app.use("/permission", accessPermissionRequestController)
        app.use("/connection", socketConnectionRequestController)
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

        AddAccessPermissionRequestController(this.__);
        AddLoginRequestController(this.__);
        AddRegisterRequestController(this.__);
        AddSocketConnectionRequestController(this.__);
    }


}




