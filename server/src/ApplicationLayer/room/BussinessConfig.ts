import { IDomainEntity } from "../../DomainLayer/Common/Common.Abstracts";
import { BussinessId } from "../../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects";
import { TableLayoutOption } from "../../DomainLayer/Domain.Order/Order.AggregateRoot";
import { MenuId } from "../../DomainLayer/Domain.Product/Product.ValueObjects";
import { RoomId } from "../../DomainLayer/Domain.Room/Room.ValueObjects";
import { RoomConfig } from "./RoomConfig";

export class BussinessConfig implements IDomainEntity<BussinessId>{

    private __id: BussinessId

    get id(): BussinessId {
        return this.__id;
    }
    private __roomConfigs: { [roomId: string]: RoomConfig }



    constructor(id: BussinessId) {

        this.__id = id;
        this.__roomConfigs = {}
    }
    AddNewRoomConfig(id: RoomId, layoutOption: TableLayoutOption, menuId: MenuId): RoomConfig {

        this.__roomConfigs[id.value] = new RoomConfig(layoutOption, menuId);
        return this.__roomConfigs[id.value];
    }
    RemoveRoomConfig(id: RoomId) {
        delete this.__roomConfigs[id.value]
    }
    GetRoomConfig(id: RoomId) {
        return this.__roomConfigs[id.value]
    }

}