import { IDomainEntity } from "../Common/Common.Abstracts";
import { AggregateRoot } from "../Common/Common.AggregateRoot";
import { Money } from "../Common/Common.ValueObjects";
import { Table } from "./Order.Abstracts";
import { OrderItem } from "./Order.Entities";
import { OrderId, OrderItemId, TableId, TableLayoutId } from "./Order.ValueObjects";

export class Order extends AggregateRoot<OrderItemId, OrderItem>{

    __orderId: OrderId
    private __totalPrice: Money

    constructor(orderId: OrderId) {

        super()
        this.__orderId = orderId;
        this.__totalPrice = new Money();
    }

}
export class TableLayout extends AggregateRoot<TableId, Table> implements IDomainEntity<TableLayoutId>{

   
    __id: TableLayoutId;


    constructor(layoutId: TableLayoutId) {

        super()
        this.__id = layoutId
    }
}

