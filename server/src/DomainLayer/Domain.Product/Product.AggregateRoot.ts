import { IDbEntity } from "../Common/Common.Abstracts";
import { AggregateRoot } from "../Common/Common.AggregateRoot";
import { BussinessId } from "../Domain.Customer/Customer.ValueObjects";
import { Product } from "./Product.Entities";
import { ProductId } from "./Product.ValueObjects";

export class Menu extends AggregateRoot<ProductId, Product>{

    constructor() {

        super()
        
    }
}