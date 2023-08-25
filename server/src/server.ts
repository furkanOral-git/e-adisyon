import express from "express";
import { Server } from "socket.io";
import { createServer } from "http"
import { exceptionMiddleware } from "./middleware";
import { AddAccessPermissionRequestController, AddLoginRequestController, AddRegisterRequestController, AddSocketConnectionRequestController, AddSocketConnectionWithUrlRequestController, accessPermissionRequestController, loginRequestController, registerRequestController, socketConnectionRequestController, socketConnectionWithUrlRequestController } from "./PresentationLayer/Controllers";
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
        app.use("/room", socketConnectionWithUrlRequestController)

        ServerManagement.__ = IOServer.GetServer(new Server(httpServer, {

            cors: {
                origin: "*",
                methods: ["POST", "GET"]
            }
        }));
        this.AddControllers()
        httpServer.listen(3001, "localhost");
    }


    private static AddControllers() {

        AddAccessPermissionRequestController();
        AddLoginRequestController();
        AddRegisterRequestController();
        AddSocketConnectionRequestController(this.__);
        AddSocketConnectionWithUrlRequestController();
    }


}




