


export interface IDomainEntity<TId extends IValueObject> {

    get id(): TId;


}

export interface IDbEntity {

}

export interface IEntityId extends IBaseValueObject {

}

export interface IBaseValueObject {

}
export interface IValueObject {


}

export abstract class BaseValueObject<TValue extends any, TValueObject extends BaseValueObject<TValue, TValueObject>> implements IBaseValueObject {

    protected __value: TValue
    public get value() {
        return this.__value;
    }
    constructor(value: TValue) {
        this.__value = value;
    }
    IsEqualTo(right: TValueObject): boolean {
        return this.__value == right.value
    }
    IsEqual(right: TValue) {
        return this.__value == right;
    }
    IsSameReference(right: TValueObject): boolean {
        return Object.is(this, right);
    }
}
