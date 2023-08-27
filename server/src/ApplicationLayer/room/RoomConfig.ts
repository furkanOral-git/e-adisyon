import { IDbEntity } from "../../DomainLayer/Common/Common.Abstracts";
import { TableLayoutOption } from "../../DomainLayer/Domain.Order/Order.AggregateRoot";
import { MenuId } from "../../DomainLayer/Domain.Product/Product.ValueObjects";

export class RoomConfig implements IDbEntity {

    private __menuId: MenuId
    public get menuId() {
        return this.__menuId;
    }
    private __tableLayoutOption: TableLayoutOption
    public get tableLayoutOption() {
        return this.__tableLayoutOption;
    }
    roomStatus: RoomContextStatus

    constructor(tableLayoutOption: TableLayoutOption, menuId: MenuId) {

        this.__tableLayoutOption = tableLayoutOption;
        this.__menuId = menuId;
        this.roomStatus = RoomContextStatus.Open
    }

}
export enum RoomContextStatus {
    Open,
    Closed
}