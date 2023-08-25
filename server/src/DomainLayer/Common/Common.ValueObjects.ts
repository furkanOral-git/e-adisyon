import { BaseValueObject, IValueObject } from "./Common.Abstracts";

export class Bill implements IValueObject {

    private __moneys: Money[]

    constructor() {

        this.__moneys = []

    }
}
export class IONameSpace extends BaseValueObject<string, IONameSpace>{

    constructor(value: string) {
        super(value);
    }

}

export class Money extends BaseValueObject<number, Money> implements IValueObject {

    constructor(value: number) {
        super(value);
    }

    IsLessThan(right: Money): boolean {
        return this.value < right.value;
    }
    IsGreaterThan(right: Money) {
        return this.value > right.value
    }




}

