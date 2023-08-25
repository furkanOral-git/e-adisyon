import { Socket } from "socket.io"
import { IDomainEntity } from "../Common/Common.Abstracts"
import { ParticipantId } from "./Room.ValueObjects"
import { IOClientInterface } from "./Room.Abstracts";
import { IONameSpace } from "../Common/Common.ValueObjects";

export class Participant implements IDomainEntity<ParticipantId>, IOClientInterface {

    private __socket: Socket | null;
    private __id: ParticipantId
    private __properties: ParticipantClientModel
    public listeners: { [event: string]: (data: any) => void };
    
    get properties() {
        return this.__properties
    }
    get id(): ParticipantId {
        return this.__id;
    }
    
    constructor(id: ParticipantId, properties: ParticipantClientModel) {

        this.__id = id
        this.__properties = properties;
        this.listeners = {}
        this.__socket = null;
    }

    connect(connectionSentence: (url: string) => void) {
        connectionSentence(this.__properties.url)
    }

    sendData(event: string, data: any) {

        this.__socket?.emit(event, data)
    }
    listen(event: string, listener: (data: any) => void) {

        this.__socket?.on(event, listener)
        this.listeners[event] = listener
    }
    off(event: string): void {

        this.__socket?.off(event, this.listeners[event])
        delete this.listeners[event]
    }
    disconnect() {

        if (!!this.__socket) {

            this.__socket.disconnect();
        }
    }


}
export class ParticipantClientModel {

    private __name: string
    private __url: string

    public get url() {
        return this.__url;
    }
    public get name() {
        return this.__name;
    }
    public listeners: { [event: string]: (data: any) => void };

    constructor(name: string, nameSpace: IONameSpace) {

        this.listeners = {}
        this.__name = name;
        this.__url = process.env.API + "/" + nameSpace.value
    }


}
