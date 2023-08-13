import { IDbEntity } from "../DomainLayer/Common/Common.Abstracts"
import { BussinessConfigFile } from "./Entities"

export interface IRepository<TEntity extends IDbEntity> {

    add(entity: TEntity): void
    remove(id: string): void
    update(selection: (entity: TEntity) => boolean, newEntity: TEntity): void
    getBy(predicate: (entity: TEntity) => boolean): TEntity | null
    filter(predicate: (entity: TEntity) => boolean): TEntity[] | null

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
    getBy(predicate: (entity: BussinessConfigFile) => boolean): BussinessConfigFile {
        throw new Error("Method not implemented.")
    }
    filter(predicate: (entity: BussinessConfigFile) => boolean): BussinessConfigFile[] {
        throw new Error("Method not implemented.")
    }

}