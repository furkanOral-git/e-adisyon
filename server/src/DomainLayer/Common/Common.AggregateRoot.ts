import { BaseValueObject, IDomainEntity } from "./Common.Abstracts";


export abstract class AggregateRoot<TId extends BaseValueObject<string, TId>, TEntity extends IDomainEntity<TId>>{

    protected __entities: TEntity[];

    constructor() {
        this.__entities = [];
    }

    protected addTo(entity: TEntity) {

        if (!this.__entities.includes(entity)) {
            this.__entities.push(entity);
        }
    }
    some(predicate: (e: TEntity) => boolean): boolean {
        return this.__entities.some(predicate)
    }
    Includes(entity: TEntity) {
        return this.__entities.includes(entity);
    }
    getAllBy(predicate: (entity: TEntity) => boolean): TEntity[] {

        return this.__entities.filter(predicate);
    }
    getBy(predicate: (entity: TEntity) => boolean): TEntity | undefined {

        return this.__entities.find(predicate)
    }
    getFirst() {
        return this.__entities[0]
    }
    getLast() {
        return this.__entities[this.__entities.length - 1]
    }
    protected getIndexOf(id: TId): number {

        return this.__entities.findIndex(p => p.id.IsEqualTo(id))
    }
    protected removeFrom(id: TId): number {

        const index = this.getIndexOf(id)
        this.__entities.splice(index, 1);
        return index
    }
    protected updateAll(newEntities: TEntity[]) {

        this.__entities = newEntities;
    }
    protected updateEntityByIndex(index: number, newEntity: TEntity) {

        this.__entities[index] = newEntity
    }
}






