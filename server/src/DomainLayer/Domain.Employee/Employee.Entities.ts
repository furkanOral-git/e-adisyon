import { Emploee } from "./Employee.Abstracts";
import { EmploeeId } from "./Employee.ValueObjects";

export class HeadWaiter extends Emploee {


    constructor(id: EmploeeId, name: string, surname: string) {
        super(id, name, surname)

    }


}

export class Waiter extends Emploee {



    constructor(id: EmploeeId, name: string, surname: string) {

        super(id, name, surname)

    }


}

export class Chef extends Emploee {



    constructor(id: EmploeeId, name: string, surname: string) {
        super(id, name, surname)

    }

}

export class Cashier extends Emploee {



    constructor(id: EmploeeId, name: string, surname: string) {
        super(id, name, surname)

    }

}

