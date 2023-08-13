import { IValueObject } from "../Common/Common.Abstracts"
import { Id } from "../Common/Common.ValueObjects"

export class TableId extends Id {

}
export class OrderId extends Id {

}
export class OrderItemId extends Id {

}
export class TableLayoutId extends Id{
}


export class TableNumber implements IValueObject {

    private __value: number

    constructor(value: number) {
        this.__value = value
    }

}
export enum TableState {
    Empty,
    Full,
    WaitingForOrder,
}
