import { Socket } from "socket.io"
import { IDomainEntity } from "../Common/Common.Abstracts"
import { Room } from "./Room.AggregateRoot"
import { EventType, ParticipantId } from "./Room.ValueObjects"

export class Participant implements IDomainEntity<ParticipantId> {

    __id: ParticipantId
    
    public __socket: Socket | null


    constructor(socket: Socket, id: ParticipantId) {

        this.__socket = socket
        this.__id = id
    }


    private JoinToRoom(room: Room) {

        this.__socket?.join(`${room.__id}.${EventType.Notification}`)
        this.__socket?.join(`${room.__id}.${EventType.Data}`)
        this.addDisconnectHandler(room)
        room.addTo(this)
    }

    private addDisconnectHandler(room: Room) {

        this.__socket?.on("disconnect", () => {

            this.__socket?.leave(`${room.__id}.${EventType.Notification}`)
            this.__socket?.leave(`${room.__id}.${EventType.Data}`)
            this.__socket = null;
        })
    }


}