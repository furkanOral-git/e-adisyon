import { IDomainEntity } from "../Common/Common.Abstracts";
import { Bill } from "../Common/Common.ValueObjects";
import { Table } from "./Order.Abstracts";
import { Order } from "./Order.AggregateRoot";
import { OrderItemId, TableId, TableNumber, TableState } from "./Order.ValueObjects";

export class OrderItem implements IDomainEntity<OrderItemId> {

    private __id: OrderItemId
    __amount: number
    
    constructor(id: OrderItemId, amount: number) {
        
        this.__id = id;
        this.__amount = amount;
    }
    get id(): OrderItemId {
        return this.__id;
    }
}
export class TableWaitingForOrder extends Table implements IDomainEntity<TableId> {

    private __waitedOrder: Order
    
    constructor(id: TableId, tableNumber: TableNumber, waitedOrder: Order) {

        super(id, tableNumber, TableState.WaitingForOrder);
        this.__waitedOrder = waitedOrder;
    }
    
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
export class EmptyTable extends Table implements IDomainEntity<TableId>{

    constructor(id: TableId, tableNumber: TableNumber) {

        super(id, tableNumber, TableState.Empty);

    }
}