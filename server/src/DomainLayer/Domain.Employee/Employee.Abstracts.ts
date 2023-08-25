import { IDomainEntity } from "../Common/Common.Abstracts";
import { EmploeeId } from "./Employee.ValueObjects";

export class Emploee implements IDomainEntity<EmploeeId> {

    private __id: EmploeeId
    get id(): EmploeeId {
        return this.__id;
    }
    name: string;

    surname: string;


    constructor(id: EmploeeId, name: string, surname: string) {

        this.__id = id;
        this.name = name;
        this.surname = surname;
    }


}