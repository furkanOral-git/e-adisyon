import { IDomainEntity, IDbEntity } from "../../DomainLayer/Common/Common.Abstracts";
import { BussinessId } from "../../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects";
import { TableLayoutOption } from "../../DomainLayer/Domain.Order/Order.AggregateRoot";
import { MenuId } from "../../DomainLayer/Domain.Product/Product.ValueObjects";
import { RoomId } from "../../DomainLayer/Domain.Room/Room.ValueObjects";

export class RoomConfig implements IDomainEntity<BussinessId>, IDbEntity {


    private __bussinessId: BussinessId;
    get id(): BussinessId {
        return this.__bussinessId;
    }
    private __roomId: RoomId
    public get roomId() {
        return this.__roomId;
    }
    private __tableLayoutOption: TableLayoutOption
    public get tableLayoutOption() {
        return this.__tableLayoutOption;
    }
    private __menuId: MenuId
    public get menuId() {
        return this.__menuId;
    }

    constructor(bussinessId: BussinessId, tableLayoutOption: TableLayoutOption, menuId: MenuId, roomId: RoomId) {

        this.__bussinessId = bussinessId
        this.__tableLayoutOption = tableLayoutOption;
        this.__menuId = menuId;
        this.__roomId = roomId;
    }


}