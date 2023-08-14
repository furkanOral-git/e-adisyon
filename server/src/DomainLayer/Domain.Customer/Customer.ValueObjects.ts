import { PackageTypes } from "../../PresentationLayer/Requests";
import { Id } from "../Common/Common.ValueObjects";

export class BussinessId extends Id {

}
export class AcountManagerId extends Id {

}
export class NullReferenceKey{

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
    private static createValue(): string {

        return Math.random().toString(36).substring(2)
    }
    public static Create(type: PackageTypes, amount: number): ReferenceKey {
        switch (type) {
            case PackageTypes.Trial:
                return this.createForDay(amount)
            case PackageTypes.Monthly:
                return this.createForMonth(amount)
            case PackageTypes.Yearly:
                return this.createForAYear();
            default:
                throw new Error("Bir Hata Oluştu")
        }
    }
    private static createForDay(day: number): ReferenceKey {

        const today = new Date()
        const expireyDate = new Date()
        expireyDate.setDate(today.getDate() + day)
        return new ReferenceKey(this.createValue(), expireyDate)
    }
    private static createForMonth(month: number): ReferenceKey {

        return this.createForDay(30 * month)
    }
    private static createForAYear(): ReferenceKey {

        return this.createForDay(365)
    }
}