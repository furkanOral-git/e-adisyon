import cors from "cors";
import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http"
import { exceptionMiddleware } from "./middleware";
import { Room } from "./DomainLayer/Common/Common.AggregateRoot";
import { AddAppRequestController, AddAuthenticationController, AddBuyAppController, appRequestController, authenticationController, buyAppController } from "./PresentationLayer/Controllers";



export default class ServerManagement {

    private static __ioServer: Server;
    private static __rooms: { [ownerId: string]: Room }


    public static buildIoServer() {

        const app = express()
        const httpServer = createServer(app);
        app.use(cors())
        app.use(exceptionMiddleware)
        this.AddControllers()
        app.use("/auth", authenticationController)
        app.use("/buy", buyAppController)
        app.use("/app", appRequestController)
        ServerManagement.__ioServer = new Server(httpServer);
        this.addConnectionEventHandlers();
        httpServer.listen(5000, "localhost");
    }

    private static addConnectionEventHandlers() {

        this.__ioServer.on("connection", (socket: Socket) => {

            //auth işlemleri yapıldıktan sonra socket oluşturulmalı

        })

    }
    private static AddControllers() {

        AddBuyAppController();
        AddAuthenticationController();
        AddAppRequestController();
    }


}




