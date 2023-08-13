import { IDomainEntity } from "../Common/Common.Abstracts";
import { AcountManagerId } from "./Customer.ValueObjects";

export class AcountManager implements IDomainEntity<AcountManagerId> {

    __id: AcountManagerId;

    constructor(id: AcountManagerId) {

        this.__id = id;
    }
}


