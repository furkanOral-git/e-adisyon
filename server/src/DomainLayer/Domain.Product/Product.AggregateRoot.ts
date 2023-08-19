import { AggregateRoot } from "../Common/Common.AggregateRoot";
import { MenuId } from "../Common/Common.ValueObjects";
import { Product } from "./Product.Entities";
import {  ProductId } from "./Product.ValueObjects";

export class Menu extends AggregateRoot<ProductId, Product>{

    private __id: MenuId

    public get id() {

        return this.__id;
    }
    constructor(id: MenuId) {
        super()
        this.__id = id;
    }
}