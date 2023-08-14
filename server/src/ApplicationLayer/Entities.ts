import { IDbEntity } from "../DomainLayer/Common/Common.Abstracts";
import { Bussiness } from "../DomainLayer/Domain.Customer/Customer.AggregateRoot";
import { TableLayout } from "../DomainLayer/Domain.Order/Order.AggregateRoot";
import { Menu } from "../DomainLayer/Domain.Product/Product.AggregateRoot";

export class BussinessConfigFile implements IDbEntity {

    private __bussiness: Bussiness
    public get bussiness() {
        return this.__bussiness;
    }
    public __tableLayout: TableLayout
    public __menu: Menu
    

    constructor(bussiness: Bussiness, tableLayout: TableLayout, menu: Menu) {

        this.__bussiness = bussiness
        this.__tableLayout = tableLayout;
        this.__menu = menu;
    }

}

