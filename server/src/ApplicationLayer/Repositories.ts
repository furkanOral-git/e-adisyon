import { IDbEntity } from "../DomainLayer/Common/Common.Abstracts"
import { AcountManager } from "../DomainLayer/Domain.Customer/Customer.Entities"
import { BussinessId, ReferenceKey } from "../DomainLayer/Domain.Customer/Customer.ValueObjects"
import { BussinessConfigFile, User } from "./Entities"

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
    getRoomIdById(bussinessId: string) : string{
        throw new Error("Method not implemented.")
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
    getKeyById(id: string): ReferenceKey {
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