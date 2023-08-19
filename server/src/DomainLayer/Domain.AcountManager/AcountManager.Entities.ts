import { IDomainEntity } from "../Common/Common.Abstracts";
import { AcountManagerId } from "./AcountManager.ValueObjects";

export class AcountManager implements IDomainEntity<AcountManagerId> {

    __id: AcountManagerId;
    private __name: string;
    private __surname: string;

    public get name() {
        return this.__name;
    }
    public get surname() {
        return this.__surname
    }

    constructor(id: AcountManagerId, name: string, surname: string) {

        this.__id = id;
        this.__name = name;
        this.__surname = surname;
    }
}


