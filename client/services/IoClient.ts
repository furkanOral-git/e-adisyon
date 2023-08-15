import { Socket, io } from "socket.io-client"
import { IoClientModel } from "./Models";


export class IoClient {

    private socket: Socket;
    private __model: IoClientModel

    public listeners: { [event: string]: (data: any) => void };

    private constructor(domain: string, port: number, model: IoClientModel) {

        this.listeners = {}
        this.socket = io(`http://${domain}:${port}`)
        this.__model = model;
    }
    
    sendNotification(event: string, mesaj: string) {

        this.socket.emit(event, mesaj)
    }
    sendData(event: string, data: {}) {

        this.socket.emit(event, data)
    }
    listen(event: string, listener: (data: any) => void) {

        this.socket.on(event, listener)
        this.listeners[event] = listener;
    }
    off(event: string): void {

        this.socket.off(event, this.listeners[event])
    }
    disconnect() {

        if (!!this.socket) {

            this.socket.disconnect();
        }
    }
}