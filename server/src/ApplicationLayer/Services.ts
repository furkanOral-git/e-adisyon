import { IDomainEntity } from "../DomainLayer/Common/Common.Abstracts";
import { Id } from "../DomainLayer/Common/Common.ValueObjects";
import { Table } from "../DomainLayer/Domain.Order/Order.Abstracts";
import { TableLayout } from "../DomainLayer/Domain.Order/Order.AggregateRoot";
import { TableId, TableLayoutId } from "../DomainLayer/Domain.Order/Order.ValueObjects";



export interface IAdvancedService<TId extends Id, TEntity extends IDomainEntity<TId>> extends IBasicService<TId, TEntity> {

    RemoveBy(predicate: (entity: TEntity) => boolean): void
    GetAllBy(predicate: (entity: TEntity) => boolean): TEntity[]
    AddTo(entity: TEntity): void
    Remove(id: TId): void
    Update(id: TId, newEntity: TEntity): void

}
export interface IBasicService<TId extends Id, TEntity extends IDomainEntity<TId>> {

    GetBy(predicate: (entity: TEntity) => boolean): TEntity | null
}

export class TableLayoutService implements IBasicService<TableLayoutId, TableLayout>{

    private static __instance: TableLayoutService;

    private constructor() {

    }

    public static GetService() : TableLayoutService {

        if (!this.__instance) {

            this.__instance = new TableLayoutService()
        }
        return this.__instance
    }

    GetBy(predicate: (entity: TableLayout) => boolean): TableLayout | null {
        return null
    }
    


}



