import { IDomainEntity } from "../Common/Common.Abstracts";
import { AcountManagerId } from "./Customer.ValueObjects";

export class AcountManager implements IDomainEntity<AcountManagerId> {

    __id: AcountManagerId;
    private __name: string;
    private __surname: string;

    constructor(id: AcountManagerId, name: string, surname: string) {

        this.__id = id;
        this.__name = name;
        this.__surname = surname;
    }
}


