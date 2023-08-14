import cors from "cors";
import express from "express";
import { Server} from "socket.io";
import { createServer } from "http"
import { exceptionMiddleware } from "./middleware";
import { AddAppRequestController, AddAuthenticationController, AddBuyAppController, appRequestController, authenticationController, buyAppController } from "./PresentationLayer/Controllers";
import { IOServer } from "./DomainLayer/Domain.Room/Room.AggregateRoot";



export default class ServerManagement {

    private static __: IOServer


    public static buildIoServer() {

        const app = express()
        const httpServer = createServer(app);
        app.use(cors())
        app.use(exceptionMiddleware)
        app.use("/auth", authenticationController)
        app.use("/buy", buyAppController)
        app.use("/app", appRequestController)
        ServerManagement.__ = new IOServer(new Server(httpServer));
        this.AddControllers()
        httpServer.listen(5000, "localhost");
    }

    
    private static AddControllers() {

        AddBuyAppController();
        AddAuthenticationController();
        AddAppRequestController();
    }


}




