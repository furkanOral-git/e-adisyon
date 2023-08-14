import { AggregateRoot } from "../Common/Common.AggregateRoot";
import { AcountManager } from "./Customer.Entities";
import { AcountManagerId, BussinessId, ReferenceKey } from "./Customer.ValueObjects";

export class Bussiness extends AggregateRoot<AcountManagerId, AcountManager> {

    private __id: BussinessId;
    public get id() {
        return this.__id;
    }
    private __name: string;
    private __roomId: string;
    private __referenceKey: ReferenceKey
    public get key() {
        return this.__referenceKey;
    }

    constructor(id: BussinessId, roomId: string, name: string, referenceKey: ReferenceKey) {

        super()
        this.__id = id;
        this.__roomId = roomId;
        this.__name = name;
        this.__referenceKey = referenceKey;
    }

}