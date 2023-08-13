import { Id } from "./Common.ValueObjects";

export interface IAggregateRoot<TEntity> {


}
export interface IDomainEntity<TId extends Id<TId>> {

    __id: TId;
}

export interface IDbEntity {

}

export interface IEntityId extends IValueObject {

}

export interface IValueObject {

}

export interface IGenericValueObject<TValueObject extends IValueObject> {

    IsEqualTo(right: TValueObject): boolean
    IsSameReference(right: TValueObject): boolean

}