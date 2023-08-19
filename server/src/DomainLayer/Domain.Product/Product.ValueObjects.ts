import { IValueObject } from "../Common/Common.Abstracts";
import { Id } from "../Common/Common.ValueObjects";

export class ProductCategory implements IValueObject {

    private __categoryName: string
    private __categoryStatus: boolean

    constructor(categoryName: string, categoryStatus: boolean) {

        this.__categoryName = categoryName;
        this.__categoryStatus = categoryStatus;
    }
    updateCategoryName(categoryName: string) {

        this.__categoryName = categoryName;
    }
}
export class ProductId extends Id{

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