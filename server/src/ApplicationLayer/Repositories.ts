import { IDbEntity } from "../DomainLayer/Common/Common.Abstracts"

export interface IRepository<TEntity extends IDbEntity> {

    add(entity: TEntity): void
    remove(id: string): void
    update(selection: (entity: TEntity) => boolean, newEntity: TEntity): void
    getBy(predicate: (entity: TEntity) => boolean): TEntity
    filter(predicate: (entity: TEntity) => boolean): TEntity[]

}