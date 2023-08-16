import { Server, Socket } from "socket.io"
import { AggregateRoot } from "../Common/Common.AggregateRoot"
import { EventType, ParticipantId, RoomId } from "./Room.ValueObjects"
import { Participant } from "./Room.Entities"
import { IDomainEntity } from "../Common/Common.Abstracts"
import { BuyRequest } from "../../PresentationLayer/Requests"

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
    private __listeners: { [event: string]: (res: any) => void }

    public get io() {
        return this.__io;
    }
    constructor(io: Server) {

        super()
        this.__io = io;
        this.__listeners = {}
    }
    private UpdateListeners(lastEvent: string) {

        this.__io.on("connection", (socket) => {

            for (const event of Object.keys(this.__listeners)) {

                if (event == lastEvent) {

                    socket.on(event, this.__listeners[event])
                }
            }
        });
    }
    listen(event: string, callback: (res: any) => void) {

        this.__listeners[event] = callback;
        this.UpdateListeners(event)
    }
    stopListen(event: string) {

        delete this.__listeners[event];
    }

}