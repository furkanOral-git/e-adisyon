import { BaseValueObject, IValueObject } from "../Common/Common.Abstracts";



export class ParticipantId extends BaseValueObject<string, ParticipantId> implements IValueObject {

}
export class RoomId extends BaseValueObject<string, RoomId> implements IValueObject {

}
export enum EventType {
    Data,
    Notification
}


