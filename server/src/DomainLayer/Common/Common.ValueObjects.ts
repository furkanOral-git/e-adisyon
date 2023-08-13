import { IEntityId, IValueObject } from "./Common.Abstracts";

export class Bill implements IValueObject {

    private __moneys: Money[]

    constructor() {

        this.__moneys = []

    }
}
export abstract class Id implements IEntityId {

    private __value: string
    public get value() {
        return this.__value;
    }

    constructor(value: string) {
        this.__value = value;

    }

    IsEqualTo<T extends Id>(id: T): boolean {
        return id.__value == this.__value ? true : false
    }

}

export class Money implements IValueObject {

}

