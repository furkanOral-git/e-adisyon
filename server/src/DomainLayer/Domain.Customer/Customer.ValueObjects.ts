import { IValueObject } from "../Common/Common.Abstracts";
import { Id } from "../Common/Common.ValueObjects";

export class BussinessId extends Id<BussinessId> {

}
export class AcountManagerId extends Id<AcountManagerId> {

}

export class ReferenceKey {

    private __value: string;
    private __expireyDate: Date

    public get Value() {
        return this.__value;
    }
    public get ExpireyDate() {
        return this.__expireyDate;
    }
    private constructor(value: string, expireyDate: Date) {

        this.__value = value;
        this.__expireyDate = expireyDate;
    }
    private createValue(): string {

        return Math.random().toString(36).substring(2)
    }
    public createForDay(day: number): ReferenceKey {

        const today = new Date()
        const expireyDate = new Date()
        expireyDate.setDate(today.getDate() + day)
        return new ReferenceKey(this.createValue(), expireyDate)
    }
    createForMonth(month: number): ReferenceKey {

        return this.createForDay(30 * month)
    }
    public createForAYear(): ReferenceKey {

        return this.createForDay(365)
    }
}