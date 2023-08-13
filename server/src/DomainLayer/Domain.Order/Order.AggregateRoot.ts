import { IDomainEntity } from "../Common/Common.Abstracts";
import { AggregateRoot } from "../Common/Common.AggregateRoot";
import { Money } from "../Common/Common.ValueObjects";
import { OrderItem } from "./Order.Entities";
import { OrderId, OrderItemId } from "./Order.ValueObjects";

export class Order extends AggregateRoot<OrderItemId, OrderItem>{
    
    __orderId: OrderId
    private __totalPrice: Money

    constructor(orderId: OrderId, items: OrderItem[]) {

        super(items)
        this.__orderId = orderId;
        this.__totalPrice = new Money();
    }

}

