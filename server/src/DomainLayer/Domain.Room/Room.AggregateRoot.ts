import { Server } from "socket.io"
import { AggregateRoot } from "../Common/Common.AggregateRoot"
import { ParticipantId, RoomId } from "./Room.ValueObjects"
import { Participant } from "./Room.Entities"
import { IDomainEntity } from "../Common/Common.Abstracts"

export class Room extends AggregateRoot<ParticipantId, Participant> implements IDomainEntity<RoomId>{

    private __id: RoomId
    

    get id(): RoomId {
        return this.__id;
    }
    constructor(roomId: RoomId) {

        super()
        this.__id = roomId
        

    }
    AddParticipant(participant: Participant) {
        this.addTo(participant);
    }

}

export class IOServer {

    private __io: Server
    private static _instance: IOServer

    public get io() {
        return this.__io;
    }
    private constructor(io: Server) {

        this.__io = io;

    }
    public static GetServer(io: Server) {

        if (!this._instance) {
            this._instance = new IOServer(io)
        }
        return this._instance;
    }


}