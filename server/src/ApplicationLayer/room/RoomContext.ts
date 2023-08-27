import { Bussiness } from "../../DomainLayer/Domain.AcountManager/AcountManager.AggregateRoot";
import { TableLayout } from "../../DomainLayer/Domain.Order/Order.AggregateRoot";
import { Menu } from "../../DomainLayer/Domain.Product/Product.AggregateRoot";
import { Room } from "../../DomainLayer/Domain.Room/Room.AggregateRoot";





export class RoomContext {

    private __menu: Menu
    private __tableLayout: TableLayout
    private __room: Room
    private __relationalBussiness: Bussiness
    
    get bussinessId() {
        return this.__relationalBussiness.id;
    }
    get room() {
        return this.__room;
    }
    constructor(menu: Menu, tableLayout: TableLayout, room: Room, bussiness: Bussiness) {

        this.__menu = menu;
        this.__tableLayout = tableLayout;
        this.__room = room;
        this.__relationalBussiness = bussiness;
        
        

    }

    Build() {

    }

    Deconstruct() {

    }
    Disconnect() {

    }

}


