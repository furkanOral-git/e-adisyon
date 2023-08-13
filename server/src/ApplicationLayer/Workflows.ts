import { BussinessId } from "../DomainLayer/Domain.Customer/Customer.ValueObjects";
import { Order, TableLayout } from "../DomainLayer/Domain.Order/Order.AggregateRoot";
import { EmptyTable, OrderItem, TableFull, TableWaitingForOrder } from "../DomainLayer/Domain.Order/Order.Entities";
import { TableId, TableLayoutId, TableNumber } from "../DomainLayer/Domain.Order/Order.ValueObjects";
import { NewOrderedProductMap, Product, ProductAmountMap } from "../DomainLayer/Domain.Product/Product.Entities";

import { BuyRequest } from "../PresentationLayer/Requests";
import { ConfigRepository } from "./Repositories";
import { RondomIdGenarator } from "./Tools";


export async function BuyAppWorkFlowAsync(request: BuyRequest): Promise<boolean> {
    //admin sayfasına veriyi gönderecek kabul edilirse 5 dakika içerisinde olumlu dönüş verilecek,frontend kısmında app sayfasına girilecek orada masa oluştur vs gibi şeyler yapılacak
    return true;
}
export function GetTablesWorkFlow(bussinessId: BussinessId, size: number, initialTableNumber: number): TableLayout {

    const repo = ConfigRepository.GetRepo();
    const result = repo.getBy(e => e.bussiness.id.IsEqualTo<BussinessId>(bussinessId))
    if (!!result.__tableLayout) {
        return result.__tableLayout;
    }

    const layout = new TableLayout(new TableLayoutId(RondomIdGenarator.CreateId()))
    for (let index: number = initialTableNumber; index <= initialTableNumber + size; index++) {

        const id = new TableId(RondomIdGenarator.CreateId())
        const table = new EmptyTable(id, new TableNumber(index))
        layout.addTo(table)

    }
    result.__tableLayout = layout;
    return layout
}

// export function CreateOrderWorkFlow(table: TableFull, { id, amount }: ProductAmountMap): Order {
//     //socket işlemleri gerekecek kanal aracılığıyla odaya verilecek
//     //ürün yeni eklenmişse menü'de gözükecek
// }
// export function CreateOrderWorkFlow(table: TableWaitingForOrder, { id, amount }: ProductAmountMap): Order {

// }
// export function CreateOrderWorkFlowWithOutMenu(table: TableFull, { orderedName, amount, productType }: NewOrderedProductMap): Order {

// }
// export function CreateOrderWorkFlowWithOutMenu(table: TableWaitingForOrder, { orderedName, amount, productType }: NewOrderedProductMap): Order {

// }


