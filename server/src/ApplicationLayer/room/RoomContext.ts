import { Socket } from "socket.io";
import { Bussiness } from "../../DomainLayer/Domain.AcountManager/AcountManager.AggregateRoot";
import { TableLayout, Order } from "../../DomainLayer/Domain.Order/Order.AggregateRoot";
import { Menu } from "../../DomainLayer/Domain.Product/Product.AggregateRoot";
import { Room, IOServer } from "../../DomainLayer/Domain.Room/Room.AggregateRoot";
import { IONameSpace } from "../../DomainLayer/Common/Common.ValueObjects";



export abstract class BaseAppContext {

    
}
export class RoomContext {

    private __nameSpace: IONameSpace;
    private __contextStatus: RoomContextStatus
    private __menu: Menu
    private __tableLayout: TableLayout
    private __room: Room
    private __orders: Order[]
    private __relationalBussiness: Bussiness
    private __ioServer: IOServer

    get bussinessId() {
        return this.__relationalBussiness.id;
    }
    get nameSpace() {
        return this.__nameSpace;
    }
    get room() {
        return this.__room;
    }
    constructor(menu: Menu, tableLayout: TableLayout, room: Room, bussiness: Bussiness, ioServer: IOServer) {

        this.__menu = menu;
        this.__tableLayout = tableLayout;
        this.__room = room;
        this.__relationalBussiness = bussiness;
        this.__contextStatus = RoomContextStatus.Open;
        this.__orders = []
        this.__ioServer = ioServer;
        this.__nameSpace = new IONameSpace(bussiness.id.value)

    }
    
   

    Deconstruct() {

    }
    Disconnect() {

    }

}
export enum RoomContextStatus {
    Open,
    Closed
}

