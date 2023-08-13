import { Socket } from "socket.io"
import { IDomainEntity } from "./Common.Abstracts"
import { EventPipes, ParticipantId } from "./Common.ValueObjects"
import { Room } from "./Common.AggregateRoot"

export class Participant implements IDomainEntity<ParticipantId> {

    __id: ParticipantId
    public __socket: Socket | null


    constructor(socket: Socket, id: ParticipantId) {

        this.__socket = socket
        this.__id = id
    }


    private JoinToRoom(room: Room) {

        this.__socket?.join(`${room.id}-${EventPipes.NotificationPipe}`)
        this.__socket?.join(`${room.id}-${EventPipes.DataPipe}`)
        this.addDisconnectHandler(room)
        room.addTo(this)
    }

    private addDisconnectHandler(room: Room) {

        this.__socket?.on("disconnect", () => {

            this.__socket?.leave(`${room.id}-${EventPipes.NotificationPipe}`)
            this.__socket?.leave(`${room.id}-${EventPipes.DataPipe}`)
            this.__socket = null;
        })
    }


}