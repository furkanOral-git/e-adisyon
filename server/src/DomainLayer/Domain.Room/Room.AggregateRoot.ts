import { Server } from "socket.io"
import { AggregateRoot } from "../Common/Common.AggregateRoot"
import { ParticipantId, DataEvents, EventPipes, NotificationEvents } from "./Room.ValueObjects"
import { Participant } from "./Room.Entities"

export class Room extends AggregateRoot<ParticipantId, Participant> {

    private __roomId: string
    private __io: Server

    public get id() {

        return this.__roomId
    }

    constructor(io: Server, roomId: string) {

        super()
        this.__roomId = roomId
        this.__io = io

    }
    emitDataToRoom(event: DataEvents, data: {}) {

        this.__io.to(`${this.__roomId}-${EventPipes.DataPipe}`).emit(event, data)
    }
    emitNotificationToRoom(event: NotificationEvents, notification: string) {

        this.__io.to(`${this.__roomId}-${EventPipes.NotificationPipe}`).emit(event, notification)
    }
    emitDataToParticipant(event: DataEvents, participantId: string, data: {}) {

        this.__io.emit(`${participantId}.DataEvent--${event}`, data)
    }
    emitNotificationToParticipant(participantId: string, event: NotificationEvents, notification: string) {

        this.__io.emit(`${participantId}.NotificationEvent--${event}`, notification)
    }
}