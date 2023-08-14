import { Server, Socket } from "socket.io"
import { AggregateRoot } from "../Common/Common.AggregateRoot"
import { EventType, ParticipantId, RoomId } from "./Room.ValueObjects"
import { Participant } from "./Room.Entities"
import { IDomainEntity } from "../Common/Common.Abstracts"

export class Room extends AggregateRoot<ParticipantId, Participant> implements IDomainEntity<RoomId>{


    __id: RoomId
    private __io: Server

    constructor(io: Server, roomId: RoomId) {

        super()
        this.__id = roomId
        this.__io = io

    }
    SendDataToRoom(event: string, data: {}) {

        this.__io.to(`${this.__id}.${EventType.Data}`).emit(event, data)
    }
    SendNotificationToRoom(event: string, notification: string) {

        this.__io.to(`${this.__id}.${EventType.Notification}`).emit(event, notification)
    }
    SendDataToParticipant(event: string, participantId: string, data: {}) {

        this.__io.emit(`${participantId}.Data--${event}`, data)
    }
    SendNotificationToParticipant(participantId: string, event: string, notification: string) {

        this.__io.emit(`${participantId}.Notification--${event}`, notification)
    }
}
export class IOServer extends AggregateRoot<RoomId, Room>{

    private __io: Server

    constructor(io: Server) {
        
        super()
        this.__io = io;
        this.addConnectionEventHandlers()
    }
    private addConnectionEventHandlers() {

        this.__io.on("connection", (socket: Socket) => {

            //auth işlemleri yapıldıktan sonra socket oluşturulmalı
            console.log(`Yeni Socket Bağlandı : ${socket.id}`)
        })

    }
}