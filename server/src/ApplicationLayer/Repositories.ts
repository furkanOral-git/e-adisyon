import { BaseValueObject, IDomainEntity } from "../DomainLayer/Common/Common.Abstracts"
import { Bussiness } from "../DomainLayer/Domain.AcountManager/AcountManager.AggregateRoot"
import { AcountManager } from "../DomainLayer/Domain.AcountManager/AcountManager.Entities"
import { AcountManagerId, BussinessId } from "../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects"
import { Menu } from "../DomainLayer/Domain.Product/Product.AggregateRoot"
import { MenuId } from "../DomainLayer/Domain.Product/Product.ValueObjects"
import { BussinessConfig } from "./room/BussinessConfig"
import { RoomConfig } from "./room/RoomConfig"
import { JWTToken, JWTTokenId } from "./services/Authentication"
import { User } from "./services/Security"

export interface IRepository<TId extends BaseValueObject<string, TId>, TEntity extends IDomainEntity<TId>> {

    add(entity: TEntity): void
    remove(id: TId): void
    update(selection: (entity: TEntity) => boolean, newEntity: TEntity): void
    getBy(predicate: (entity: TEntity) => boolean): TEntity | null
    filter(predicate: (entity: TEntity) => boolean): TEntity[] | null
    some(predicate: (entity: TEntity) => boolean): boolean
}
abstract class InMemoryBaseRepository<TId extends BaseValueObject<string, TId>, TEntity extends IDomainEntity<TId>> implements IRepository<TId, TEntity>{

    protected __enitities: TEntity[];

    constructor() {

        this.__enitities = []
    }
    add(entity: TEntity): void {
        if (!this.__enitities.includes(entity)) {
            this.__enitities.push(entity);
            return;
        }
        console.log("Varlık zaten eklenmiş")
    }
    remove(id: TId): void {

        const index = this.__enitities.findIndex(e => e.id.IsEqualTo(id))
        if (index > -1) {
            this.__enitities.splice(index, 1);
            console.log("Kaldırıldı");
            return;
        }
        console.log("Varlık bulunamadı")
    }
    update(selection: (entity: TEntity) => boolean, newEntity: TEntity): void {

        const index = this.__enitities.findIndex(selection)
        if (index > -1) {
            this.__enitities.splice(index, 1, { ...newEntity })
            console.log("Güncellendi")
            return;
        }
        console.log("Varlık bulunamadı")
    }
    getBy(predicate: (entity: TEntity) => boolean): TEntity | null {
        const result = this.__enitities.find(predicate)
        return result ?? null
    }
    filter(predicate: (entity: TEntity) => boolean): TEntity[] {
        const result = this.__enitities.filter(predicate);
        return result
    }
    some(predicate: (entity: TEntity) => boolean): boolean {
        return this.__enitities.some(predicate);
    }
}
export class BussinessConfigRepository extends InMemoryBaseRepository<BussinessId, BussinessConfig>{
    
    private static __instance: BussinessConfigRepository;
    private constructor() {
        super()
    }
    static GetRepo(): BussinessConfigRepository {

        if (!this.__instance) {
            this.__instance = new BussinessConfigRepository();
        }
        return this.__instance;
    }
}
export class BussinessRepository extends InMemoryBaseRepository<BussinessId, Bussiness> {

    private static __instance: BussinessRepository;
    private constructor() {
        super()
    }
    static GetRepo(): BussinessRepository {

        if (!this.__instance) {
            this.__instance = new BussinessRepository();
        }
        return this.__instance;
    }
    getAcountManagerBy(id: BussinessId, predicate: (a: AcountManager) => boolean): AcountManager | null {

        const bussiness = this.__enitities.find(b => b.some(predicate))
        if (!!bussiness) {

            return bussiness.getBy(predicate) ?? null
        }
        console.log("Aradığınız yöneticiyi barındıran işletme bulunamadı")
        return null
    }


}
export class JWTRepository extends InMemoryBaseRepository<JWTTokenId, JWTToken>{

    private static __instance: JWTRepository;

    private constructor() {
        super()
    }
    static GetRepo(): JWTRepository {

        if (!!this.__instance) {

            this.__instance = new JWTRepository();
        }
        return this.__instance;
    }



}
export class MenuRepository extends InMemoryBaseRepository<MenuId, Menu>{

    private static __instance: MenuRepository
    private constructor() {
        super()
    }
    static GetRepo() {

        if (!!this.__instance) {

            this.__instance = new MenuRepository();
        }
        return this.__instance;
    }


}
export class UserRepository extends InMemoryBaseRepository<AcountManagerId, User> {


    private static __instance: UserRepository;

    private constructor() {
        super()
    }

    public static GetRepo() {

        if (!!this.__instance) {
            this.__instance = new UserRepository();
        }
        return this.__instance;
    }

}