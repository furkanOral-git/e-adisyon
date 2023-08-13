import { IEntityId, IGenericValueObject, IValueObject } from "./Common.Abstracts";

export class Bill implements IValueObject {

    private __moneys: Money[]

    constructor() {

        this.__moneys = []

    }
}
export abstract class Id<TId extends IValueObject> implements IValueObject, IGenericValueObject<TId>, IEntityId {
    private __value: string


    constructor(value: string) {
        this.__value = value;

    }
    IsEqualTo(right: TId): boolean {
        throw new Error("Method not implemented.");
    }
    IsSameReference(right: TId): boolean {
        throw new Error("Method not implemented.");
    }

}
export class RoomId extends Id<RoomId> implements IValueObject {

}
export class ParticipantId extends Id<ParticipantId> implements IValueObject {

}
export class Money implements IValueObject {

}
export enum EventPipes {
    DataPipe = "DataPipe",
    NotificationPipe = "NotificationPipe"
}
export enum DataEvents {
    EmitTables = "emitTables"
}
export enum NotificationEvents {

    Connected = "connected"
}
export enum ServerEvents {

    Auth = "auth"
}
