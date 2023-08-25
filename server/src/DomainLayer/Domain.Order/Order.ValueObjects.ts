import { BaseValueObject, IValueObject } from "../Common/Common.Abstracts"

export class TableId extends BaseValueObject<string, TableId> implements IValueObject {

}
export class OrderId extends BaseValueObject<string, OrderId> implements IValueObject {

}
export class OrderItemId extends BaseValueObject<string, OrderItemId> implements IValueObject {

}


export class TableNumber extends BaseValueObject<number, TableNumber> implements IValueObject {

    constructor(value: number) {
        super(value)
    }

}
export enum TableState {
    Empty,
    Full,
    WaitingForOrder,
}
