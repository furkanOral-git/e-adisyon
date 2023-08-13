import { Socket, io } from "socket.io-client"


export class IoClient {

    private socket: Socket;
    private __roomId: string;
    private __participantId : string;
    private __name : string;
    private __surname : string;

    public listeners: { [event: string]: (data: any) => void };

    private constructor(domain: string, port: number, roomId: string, participantId: string, name: string, surname: string) {

        this.listeners = {}
        this.socket = io(`http://${domain}:${port}`)
        this.__name = name;
        this.__surname = surname;
        this.__participantId = participantId;
        this.__roomId = roomId;
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

            this.socket.disconnect()
        }
    }
}