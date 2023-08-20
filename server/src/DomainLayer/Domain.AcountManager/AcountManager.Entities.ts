import { IDomainEntity } from "../Common/Common.Abstracts";
import { AcountManagerId } from "./AcountManager.ValueObjects";

export class AcountManager implements IDomainEntity<AcountManagerId> {

    __id: AcountManagerId;
    private __name: string;

    public get name() {
        return this.__name;
    }
   

    constructor(id: AcountManagerId, name: string) {

        this.__id = id;
        this.__name = name;
        
    }
}


