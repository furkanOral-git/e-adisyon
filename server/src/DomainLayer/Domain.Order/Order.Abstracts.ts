import { IDomainEntity } from "../Common/Common.Abstracts";
import { TableId, TableNumber, TableState } from "./Order.ValueObjects";

export abstract class Table implements IDomainEntity<TableId> {

    __id: TableId;
    __tableNumber: TableNumber;
    __tableState: TableState;

    constructor(tableId: TableId, tableNumber: TableNumber, tableState = TableState.Empty) {

        this.__id = tableId;
        this.__tableNumber = tableNumber;
        this.__tableState = tableState
    }
    
    
}