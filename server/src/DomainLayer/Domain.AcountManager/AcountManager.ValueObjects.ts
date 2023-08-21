import { IDbEntity, IDomainEntity } from "../Common/Common.Abstracts";
import { Id, MenuId, TableLayoutId } from "../Common/Common.ValueObjects";


export class BussinessId extends Id {

}
export class AcountManagerId extends Id {

}
export class NullReferenceKey {

}
export class BussinessConfigFile implements IDomainEntity<BussinessId>, IDbEntity {

    
    private __bussinessId: BussinessId;
    
    get id(): BussinessId {
        return this.__bussinessId;
    }
    private __tableLayoutId: TableLayoutId
    public get tableLayoutId() {
        return this.__tableLayoutId;
    }
    private __menuId: MenuId
    public get menuId() {
        return this.__menuId;
    }

    constructor(bussinessId: BussinessId, tableLayoutId: TableLayoutId, menuId: MenuId) {

        this.__bussinessId = bussinessId
        this.__tableLayoutId = tableLayoutId;
        this.__menuId = menuId;
    }

    updateTableLayout(id: string) {
        this.__tableLayoutId.Update(id);
    }
    updateMenu(id: string) {
        this.__menuId.Update(id);
    }
}