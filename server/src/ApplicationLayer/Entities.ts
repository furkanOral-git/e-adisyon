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
export class User {

    private __id: string;
    private __bussinessId: string
    private __email: string
    private __password: string;

    public get id() {
        return this.__id;
    }
    public get bussinessId() {
        return this.__bussinessId;
    }
    public get email() {
        return this.__email;
    }
    public get password() {
        return this.__password;
    }
    constructor(id: string, bussinessId: string, email: string, password: string) {

        this.__id = id;
        this.__bussinessId = bussinessId;
        this.__email = email;
        this.__password = password;
    }
}
