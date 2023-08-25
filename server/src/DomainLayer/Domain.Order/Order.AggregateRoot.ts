import { IDomainEntity } from "../Common/Common.Abstracts";
import { AggregateRoot } from "../Common/Common.AggregateRoot";
import { Money} from "../Common/Common.ValueObjects";
import { Table } from "./Order.Abstracts";
import { OrderItem } from "./Order.Entities";
import { OrderId, OrderItemId, TableId, TableNumber } from "./Order.ValueObjects";

export class Order extends AggregateRoot<OrderItemId, OrderItem> implements IDomainEntity<OrderId>{

    private __orderId: OrderId
    private __totalPrice: Money

    constructor(orderId: OrderId) {

        super()
        this.__orderId = orderId;
        this.__totalPrice = new Money(0);
    }
    get id(): OrderId {
        return this.__orderId;
    }


}
export class TableLayout extends AggregateRoot<TableId, Table> {
    
    private __option: TableLayoutOption

    constructor(option: TableLayoutOption) {

        super()
        this.__option = option;
    }

}
export interface TableLayoutOption {

    amount: number
    indexTableNumber: number

}

