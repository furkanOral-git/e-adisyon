import { IDomainEntity } from "../Common/Common.Abstracts";
import { AcountManagerId } from "./AcountManager.ValueObjects";

export class AcountManager implements IDomainEntity<AcountManagerId> {

    private __id: AcountManagerId;
    private __name: string;

    public get name() {
        return this.__name;
    }
    get id(): AcountManagerId {
        return this.__id;
    }
    constructor(id: AcountManagerId, name: string) {

        this.__id = id;
        this.__name = name;

    }

}



