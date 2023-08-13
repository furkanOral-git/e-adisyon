import { Id } from "../Common/Common.ValueObjects";

export class RoomId extends Id {

}
export class ParticipantId extends Id {

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