import { IDomainEntity } from "../../DomainLayer/Common/Common.Abstracts"
import { Id } from "../../DomainLayer/Common/Common.ValueObjects"



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







