import { Id } from "./Common.ValueObjects";


export interface IDomainEntity<TId extends Id> {

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