import { IDbEntity } from "../DomainLayer/Common/Common.Abstracts"
import { Bussiness } from "../DomainLayer/Domain.AcountManager/AcountManager.AggregateRoot"
import { AcountManager } from "../DomainLayer/Domain.AcountManager/AcountManager.Entities"
import { BussinessConfigFile } from "../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects"
import { Menu } from "../DomainLayer/Domain.Product/Product.AggregateRoot"
import { JWTToken } from "./services/Authentication"
import { User } from "./services/Security"

export interface IRepository<TEntity extends IDbEntity> {

    add(entity: TEntity): void
    remove(id: string): void
    update(selection: (entity: TEntity) => boolean, newEntity: TEntity): void
    getBy(predicate: (entity: TEntity) => boolean): TEntity | null
    filter(predicate: (entity: TEntity) => boolean): TEntity[] | null
    some(predicate: (entity: TEntity) => boolean): boolean
}

export class ConfigRepository implements IRepository<BussinessConfigFile>{

    private static __instance: ConfigRepository

    private constructor() {

    }

    public static GetRepo(): ConfigRepository {

        if (this.__instance) {
            this.__instance = new ConfigRepository();
        }
        return this.__instance;
    }
    add(entity: BussinessConfigFile): void {
        throw new Error("Method not implemented.")
    }
    remove(id: string): void {
        throw new Error("Method not implemented.")
    }
    update(selection: (entity: BussinessConfigFile) => boolean, newEntity: BussinessConfigFile): void {
        throw new Error("Method not implemented.")
    }
    getAcountManagerBy(predicate: (a: AcountManager) => boolean): AcountManager {
        throw new Error("Method not implemented.")
    }
    getBy(predicate: (entity: BussinessConfigFile) => boolean): BussinessConfigFile {
        throw new Error("Method not implemented.")
    }
    filter(predicate: (entity: BussinessConfigFile) => boolean): BussinessConfigFile[] {
        throw new Error("Method not implemented.")
    }
    some(predicate: (entity: BussinessConfigFile) => boolean): boolean {
        throw new Error("Method not implemented.")
    }


}
export class BussinessRepository implements IRepository<Bussiness>{

    private static __instance: BussinessRepository;
    private constructor() {

    }
    static GetRepo(): BussinessRepository {

        if (!!this.__instance) {
            this.__instance = new BussinessRepository();
        }
        return this.__instance;
    }

    add(entity: Bussiness): void {
        throw new Error("Method not implemented.")
    }
    remove(id: string): void {
        throw new Error("Method not implemented.")
    }
    update(selection: (entity: Bussiness) => boolean, newEntity: Bussiness): void {
        throw new Error("Method not implemented.")
    }
    getBy(predicate: (entity: Bussiness) => boolean): Bussiness | null {
        throw new Error("Method not implemented.")
    }
    filter(predicate: (entity: Bussiness) => boolean): Bussiness[] | null {
        throw new Error("Method not implemented.")
    }
    some(predicate: (entity: Bussiness) => boolean): boolean {
        throw new Error("Method not implemented.")
    }

}
export class JWTRepository implements IRepository<JWTToken>{

    private static __instance: JWTRepository;

    private constructor() {

    }
    static GetRepo(): JWTRepository {

        if (!!this.__instance) {

            this.__instance = new JWTRepository();
        }
        return this.__instance;
    }

    add(entity: JWTToken): void {
        throw new Error("Method not implemented.")
    }
    remove(id: string): void {
        throw new Error("Method not implemented.")
    }
    update(selection: (entity: JWTToken) => boolean, newEntity: JWTToken): void {
        throw new Error("Method not implemented.")
    }
    getBy(predicate: (entity: JWTToken) => boolean): JWTToken | null {
        throw new Error("Method not implemented.")
    }
    filter(predicate: (entity: JWTToken) => boolean): JWTToken[] | null {
        throw new Error("Method not implemented.")
    }
    some(predicate: (entity: JWTToken) => boolean): boolean {
        throw new Error("Method not implemented.")
    }

}
export class MenuRepository implements IRepository<Menu>{

    private static __instance: MenuRepository
    private constructor() {

    }
    static GetRepo() {

        if (!!this.__instance) {

            this.__instance = new MenuRepository();
        }
        return this.__instance;
    }
    add(entity: Menu): void {
        throw new Error("Method not implemented.")
    }
    remove(id: string): void {
        throw new Error("Method not implemented.")
    }
    update(selection: (entity: Menu) => boolean, newEntity: Menu): void {
        throw new Error("Method not implemented.")
    }
    getBy(predicate: (entity: Menu) => boolean): Menu | null {
        throw new Error("Method not implemented.")
    }
    filter(predicate: (entity: Menu) => boolean): Menu[] | null {
        throw new Error("Method not implemented.")
    }
    some(predicate: (entity: Menu) => boolean): boolean {
        throw new Error("Method not implemented.")
    }

}
export class UserRepository implements IRepository<User> {


    private static __instance: UserRepository;

    private constructor() {

    }

    public static GetRepo() {

        if (!!this.__instance) {
            this.__instance = new UserRepository();
        }
        return this.__instance;
    }

    some(predicate: (entity: User) => boolean): boolean {
        throw new Error("Method not implemented.")
    }
    add(entity: User): void {
        throw new Error("Method not implemented.")
    }
    remove(id: string): void {
        throw new Error("Method not implemented.")
    }
    update(selection: (entity: User) => boolean, newEntity: User): void {
        throw new Error("Method not implemented.")
    }
    getBy(predicate: (entity: User) => boolean): User | null {
        throw new Error("Method not implemented.")
    }
    filter(predicate: (entity: User) => boolean): User[] | null {
        throw new Error("Method not implemented.")
    }

}