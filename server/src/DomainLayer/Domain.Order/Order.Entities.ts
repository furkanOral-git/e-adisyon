import { IDomainEntity } from "../Common/Common.Abstracts";
import { Bill } from "../Common/Common.ValueObjects";
import { Table } from "./Order.Abstracts";
import { Order } from "./Order.AggregateRoot";
import { OrderItemId, TableId, TableNumber, TableState } from "./Order.ValueObjects";

export class OrderItem implements IDomainEntity<OrderItemId> {

    __id: OrderItemId

    constructor(id: OrderItemId) {
        this.__id = id;

    }
}
export class TableWaitingForOrder extends Table implements IDomainEntity<TableId> {
    
}
export class TableFull extends Table implements IDomainEntity<TableId> {

    private __orders: Order[]
    private __currentBill: Bill


    constructor(tableId: TableId, tableNumber: TableNumber) {

        super(tableId, tableNumber, TableState.Full)
        this.__orders = []
        this.__currentBill = new Bill()
    }
}