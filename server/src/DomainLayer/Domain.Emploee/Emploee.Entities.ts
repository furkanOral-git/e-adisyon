import { IDomainEntity } from "../Common/Common.Abstracts";
import { Emploee } from "./Emploee.Abstracts";
import { EmploeeId } from "./Emploee.ValueObjects";

export class HeadWaiter extends Emploee implements IDomainEntity<EmploeeId>{


    constructor(id: EmploeeId, name: string, surname: string) {
        super(id, name, surname)
        this.__id = id;
    }


}

export class Waiter extends Emploee implements IDomainEntity<EmploeeId>{

    

    constructor(id: EmploeeId, name: string, surname: string) {
        
        super(id, name, surname)
        this.__id = id;
    }

}

export class Chef extends Emploee implements IDomainEntity<EmploeeId>{

    

    constructor(id: EmploeeId, name: string, surname: string) {
        super(id, name, surname)
        this.__id = id;
    }

}

export class Cashier extends Emploee implements IDomainEntity<EmploeeId>{

    

    constructor(id: EmploeeId, name: string, surname: string) {
        super(id, name, surname)
        this.__id = id;
    }

}

