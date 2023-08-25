import { Server } from "socket.io"
import { AggregateRoot } from "../Common/Common.AggregateRoot"
import { ParticipantId, RoomId } from "./Room.ValueObjects"
import { Participant } from "./Room.Entities"
import { IDomainEntity } from "../Common/Common.Abstracts"
import { IONameSpace } from "../Common/Common.ValueObjects"

export class Room extends AggregateRoot<ParticipantId, Participant> implements IDomainEntity<RoomId>{

    private __id: RoomId
    private __nameSpace: IONameSpace

    get id(): RoomId {
        return this.__id;
    }
    constructor(roomId: RoomId, nameSpace: IONameSpace) {

        super()
        this.__id = roomId
        this.__nameSpace = nameSpace;

    }
    AddParticipant(participant: Participant) {
        this.addTo(participant);
    }

}
export class IOServer extends AggregateRoot<RoomId, Room>{

    private __io: Server
    private static _instance: IOServer

    public get io() {
        return this.__io;
    }
    private constructor(io: Server) {

        super()
        this.__io = io;

    }
    public static GetServer(io: Server) {

        if (!this._instance) {
            this._instance = new IOServer(io)
        }
        return this._instance;
    }


}