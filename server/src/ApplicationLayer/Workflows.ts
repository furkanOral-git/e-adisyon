import { Table } from "../DomainLayer/Domain.Order/Order.Abstracts";
import { BuyRequest } from "../PresentationLayer/Requests";

export async function BuyAppWorkFlowAsync(request: BuyRequest): Promise<boolean> {
    return true;
}

