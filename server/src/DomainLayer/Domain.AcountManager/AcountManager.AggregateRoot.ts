import { IDomainEntity } from "../Common/Common.Abstracts";
import { AggregateRoot } from "../Common/Common.AggregateRoot";
import { AcountManager } from "./AcountManager.Entities";
import { AcountManagerId, BussinessId } from "./AcountManager.ValueObjects";

export class Bussiness extends AggregateRoot<AcountManagerId, AcountManager> implements IDomainEntity<BussinessId> {

    private __id: BussinessId;
    public get id() {
        return this.__id;
    }
    private __name: string;
    public get name() {
        return this.__name;
    }


    constructor(id: BussinessId, name: string) {

        super()
        this.__id = id;
        this.__name = name;
    }
    SignAcountManager(manager: AcountManager) {

        if (!this.Includes(manager)) {
            this.addTo(manager);
        }
    }


}
