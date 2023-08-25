import { IDomainEntity } from "../Common/Common.Abstracts";
import { TableId, TableNumber, TableState } from "./Order.ValueObjects";

export abstract class Table implements IDomainEntity<TableId> {

    private __id: TableId;
    protected tableNumber: TableNumber;
    protected tableState: TableState;
    protected tableSpecialName: string

    get id(): TableId {
        return this.__id;
    }
    constructor(tableId: TableId, tableNumber: TableNumber, tableState = TableState.Empty) {

        this.__id = tableId;
        this.tableNumber = tableNumber;
        this.tableState = tableState
        this.tableSpecialName = ""
    }



}