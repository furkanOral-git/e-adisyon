import { BaseValueObject, IValueObject } from "../Common/Common.Abstracts";

export class ProductCategory extends BaseValueObject<string, ProductCategory> implements IValueObject {


    private __categoryStatus: boolean

    constructor(categoryName: string, categoryStatus: boolean) {

        super(categoryName)
        this.__categoryStatus = categoryStatus;
    }

}
export class ProductId extends BaseValueObject<string, ProductId> implements IValueObject {
    
}
export class MenuId extends BaseValueObject<string, MenuId> implements IValueObject {

}
export enum ProductStatus {
    ReadyForOrder,
    CanNotReadyForOrder,
    ShouldBeTakeMoreOrder,
}
export enum TypeOfProduct {
    KitchenProduct,
    ReadyProduct,
}