import { IDomainEntity } from "./Common.Abstracts";
import { Id } from "./Common.ValueObjects";


export abstract class AggregateRoot<TId extends Id, TEntity extends IDomainEntity<TId>>{

    protected __entities: TEntity[];

    constructor() {
        this.__entities = [];
    }

    addTo(entity: TEntity) {

        if (!this.__entities.includes(entity)) {
            this.__entities.push(entity);
        }
    }
    getAllBy(predicate: (entity: TEntity) => boolean): TEntity[] {

        return this.__entities.filter(predicate);
    }
    getBy(predicate: (entity: TEntity) => boolean): TEntity | undefined {

        return this.__entities.find(predicate)
    }
    getIndexOf(id: TId): number {

        return this.__entities.findIndex(p => p.__id.IsEqualTo(id))
    }
    removeFrom(id: TId): number {

        const index = this.getIndexOf(id)
        this.__entities.splice(index, 1);
        return index
    }
    updateAll(newEntities: TEntity[]) {

        this.__entities = newEntities;
    }
    updateProductByIndex(index: number, newEntity: TEntity) {

        this.__entities[index] = newEntity
    }
}






