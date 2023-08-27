import { PackageTypes } from "./Authentication";

export class ReferenceKey {

    private __expireyDate: Date
    private __customerId: string
    private __packageType: PackageTypes

    public get packageType() {
        return this.__packageType
    }
    public get customerId() {
        return this.__customerId;
    }
    public get ExpireyDate() {
        return this.__expireyDate;
    }
    private constructor(customerId: string, packageType: PackageTypes, expireyDate: Date) {

        this.__packageType = packageType;
        this.__customerId = customerId;
        this.__expireyDate = expireyDate;
    }

    public static Create(customerId: string, type: PackageTypes, amount: number): ReferenceKey {
        switch (type) {
            case PackageTypes.Trial:
                return this.create(customerId, type, amount)
            case PackageTypes.Monthly:
                return this.createForMonth(customerId, type, amount)
            case PackageTypes.Yearly:
                return this.createForYear(customerId, type, amount);
            default:
                throw new Error("Bir Hata Oluştu")
        }
    }
    public isExpired(): boolean {
        const currentDate = new Date();
        return this.ExpireyDate < currentDate
    }
    private static create(customerId: string, packageType: PackageTypes, day: number): ReferenceKey {

        const today = new Date()
        const expireyDate = new Date()
        expireyDate.setDate(today.getDate() + day)
        return new ReferenceKey(customerId, packageType, expireyDate)
    }
    private static createForMonth(customerId: string, packageType: PackageTypes, month: number): ReferenceKey {

        return this.create(customerId, packageType, 30 * month)
    }
    private static createForYear(customerId: string, packageType: PackageTypes, year: number): ReferenceKey {

        return this.create(customerId, packageType, 365 * year)
    }
}