import { IDomainEntity } from "../Common/Common.Abstracts";
import { Money } from "../Common/Common.ValueObjects";
import { ProductCategory, ProductId, ProductStatus, TypeOfProduct } from "./Product.ValueObjects";

export class Product implements IDomainEntity<ProductId> {

    public __id: ProductId
    public __name: string;
    public __unitPrice: Money;
    public __category: ProductCategory
    public __status: ProductStatus
    public __typeOfProduct: TypeOfProduct

    constructor(id: ProductId, name: string, unitPrice: Money, category: ProductCategory, canBe: boolean, status = ProductStatus.ReadyForOrder, type: TypeOfProduct) {

        this.__id = id;
        this.__name = name;
        this.__unitPrice = unitPrice;
        this.__category = category;
        this.__status = status;
        this.__typeOfProduct = type;
    }
    
    

}