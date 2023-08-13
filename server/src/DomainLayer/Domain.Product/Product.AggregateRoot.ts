import { IDbEntity } from "../Common/Common.Abstracts";
import { AggregateRoot } from "../Common/Common.AggregateRoot";
import { BussinessId } from "../Domain.Customer/Customer.ValueObjects";
import { Product } from "./Product.Entities";
import { ProductId } from "./Product.ValueObjects";

export class Menu extends AggregateRoot<ProductId, Product> implements IDbEntity {

    private __bussinessId: BussinessId

    constructor(entities: Product[], bussinessId: BussinessId) {

        super(entities)
        this.__bussinessId = bussinessId;
    }

    getBussinessId(): BussinessId {
        return this.__bussinessId
    }


}