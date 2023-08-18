import { Socket, io } from "socket.io-client"
import { IoClientModel } from "./Models";


export class IoClient {

    private __socket: Socket | undefined;
    private __model: IoClientModel

    public listeners: { [event: string]: (data: any) => void };

    private constructor(model: IoClientModel) {

        this.listeners = {}

        this.__model = model;
    }
   
    connect(domain: string, port: number) {

        this.__socket = io(`http://${domain}:${port}`)
    }
    sendNotification(event: string, mesaj: string) {

        this.__socket?.emit(event, mesaj)
    }
    sendData(event: string, data: {}) {

        this.__socket?.emit(event, data)
    }
    listen(event: string, listener: (data: any) => void) {

        this.__socket?.on(event, listener)
        this.listeners[event] = listener;
    }
    off(event: string): void {

        this.__socket?.off(event, this.listeners[event])
    }
    disconnect() {

        if (!!this.__socket) {

            this.__socket.disconnect();
        }
    }
}