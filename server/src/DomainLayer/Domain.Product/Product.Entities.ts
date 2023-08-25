import { IDomainEntity } from "../Common/Common.Abstracts";
import { Money } from "../Common/Common.ValueObjects";
import { ProductCategory, ProductId, ProductStatus, TypeOfProduct } from "./Product.ValueObjects";

export interface ProductAmountMap {

    id: ProductId,
    amount: number
}
export interface NewOrderedProductMap {

    orderedName: string
    productType: TypeOfProduct
    amount: number
}
export class Product implements IDomainEntity<ProductId> {

    private __id: ProductId
    private __name: string;
    private __unitPrice: Money;
    private __category: ProductCategory
    private __status: ProductStatus
    private __typeOfProduct: TypeOfProduct

    constructor(id: ProductId, name: string, unitPrice: Money, category: ProductCategory, canBe: boolean, status = ProductStatus.ReadyForOrder, type: TypeOfProduct) {

        this.__id = id;
        this.__name = name;
        this.__unitPrice = unitPrice;
        this.__category = category;
        this.__status = status;
        this.__typeOfProduct = type;
    }
    get id(): ProductId {
        return this.__id;
    }



}