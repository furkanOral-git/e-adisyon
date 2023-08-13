import { Server } from "socket.io";
import { IDomainEntity } from "./Common.Abstracts";
import { Participant } from "./Common.Entities";
import { DataEvents, EventPipes, Id, NotificationEvents, ParticipantId } from "./Common.ValueObjects";

export abstract class AggregateRoot<TId extends Id<TId>, TEntity extends IDomainEntity<TId>>{

    protected __entities: TEntity[];

    constructor(entities: TEntity[]) {
        this.__entities = entities;
    }

    addTo(product: TEntity) {

        if (!this.__entities.includes(product)) {
            this.__entities.push(product);
        }
    }
    getAllBy(predicate: (product: TEntity) => boolean): TEntity[] {

        return this.__entities.filter(predicate);
    }
    getBy(predicate: (product: TEntity) => boolean): TEntity | undefined {

        return this.__entities.find(predicate)
    }
    getIndexOf(id: TId): number {

        return this.__entities.findIndex(p => p.__id.IsEqualTo(id))
    }
    removeFrom(id: TId): number {

        const index = this.getIndexOf(id)
        this.__entities.splice(index, 1);
        return index
    }
    updateAll(newEntities: TEntity[]) {

        this.__entities = newEntities;
    }
    updateProductByIndex(index: number, newProduct: TEntity) {

        this.__entities[index] = newProduct
    }
}

export class Room extends AggregateRoot<ParticipantId, Participant> {

    private __roomId: string
    private __io: Server

    public get id() {

        return this.__roomId
    }

    constructor(io: Server, roomId: string, participants: Participant[]) {

        super(participants)
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

    // public HasDefinedIdBefore(id: string): boolean {

    //     return this.__participants.some(p => p.__id.IsEqualTo())
    // }
    // public updateSocketForParticipant(id: string, newSocket: Socket) {

    //     const participant = this.__participants.find(p => p.id == id)
    //     if (participant) {
    //         participant.__socket = newSocket;
    //     }

    // }

    

}