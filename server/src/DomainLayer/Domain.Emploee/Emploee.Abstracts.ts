import { IDomainEntity } from "../Common/Common.Abstracts";
import { EmploeeId } from "./Emploee.ValueObjects";

export class Emploee implements IDomainEntity<EmploeeId> {

    __id: EmploeeId
    private set id(value: EmploeeId) {
        this.__id = value;
    }
    __name: string;
    private set name(value: string) {
        this.__name = value
    }
    __surname: string;
    private set surName(value: string) {
        this.__surname = value;
    }

    constructor(id: EmploeeId, name: string, surname: string) {

        this.__id = id;
        this.__name = name;
        this.__surname = surname;
    }

}