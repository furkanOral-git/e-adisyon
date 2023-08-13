import { IAggregateRoot } from "../Common/Common.Abstracts";
import { RoomId } from "../Common/Common.ValueObjects";
import { AcountManager } from "./Customer.Entities";
import { BussinessId, ReferenceKey } from "./Customer.ValueObjects";

export class Bussiness implements IAggregateRoot<AcountManager> {

    private __id: BussinessId;
    private __name: string;
    private __roomId: RoomId
    private __referenceKey: ReferenceKey
    private __acountManagers: AcountManager[]


    constructor(id: BussinessId, name: string, acountManagers: AcountManager[], referenceKey: ReferenceKey, roomId: RoomId) {


        this.__id = id;
        this.__name = name;
        this.__acountManagers = acountManagers
        this.__referenceKey = referenceKey;
        this.__roomId = roomId;
    }

}