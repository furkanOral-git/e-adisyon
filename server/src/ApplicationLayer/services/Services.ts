import { BaseValueObject, IDomainEntity } from "../../DomainLayer/Common/Common.Abstracts"
import { IONameSpace } from "../../DomainLayer/Common/Common.ValueObjects"
import { Bussiness } from "../../DomainLayer/Domain.AcountManager/AcountManager.AggregateRoot"
import { BussinessId } from "../../DomainLayer/Domain.AcountManager/AcountManager.ValueObjects"
import { TableLayout, TableLayoutOption } from "../../DomainLayer/Domain.Order/Order.AggregateRoot"
import { Menu } from "../../DomainLayer/Domain.Product/Product.AggregateRoot"
import { MenuId } from "../../DomainLayer/Domain.Product/Product.ValueObjects"
import { IOServer, Room } from "../../DomainLayer/Domain.Room/Room.AggregateRoot"
import { ParticipantClientModel, Participant } from "../../DomainLayer/Domain.Room/Room.Entities"
import { ParticipantId, RoomId } from "../../DomainLayer/Domain.Room/Room.ValueObjects"
import { LoginRequest, RegisterRequest } from "../../PresentationLayer/Requests"
import { EmailHasBeenUsedAlready, EmailHasNotFound, WrongPasswordEntered } from "../Errors"
import { UserRepository, MenuRepository, BussinessConfigRepository, BussinessRepository } from "../Repositories"
import { RondomIdGenarator } from "../Tools"
import { BussinessConfig } from "../room/BussinessConfig"
import { RoomConfig } from "../room/RoomConfig"
import { RoomContext } from "../room/RoomContext"
import { SecurityManager, User } from "./Security"



export interface IAdvancedService<TId extends BaseValueObject<string, TId>, TEntity extends IDomainEntity<TId>> extends IReadOnlyService<TId, TEntity> {

    RemoveBy(predicate: (entity: TEntity) => boolean): void
    AddTo(entity: TEntity): void
    Remove(id: TId): void
    Update(id: TId, newEntity: TEntity): void

}
export interface IReadOnlyService<TId extends BaseValueObject<string, TId>, TEntity extends IDomainEntity<TId>> {

    GetBy(predicate: (entity: TEntity) => boolean): TEntity | null
    Some(predicate: (entity: TEntity) => boolean): boolean
    GetAllBy(predicate: (entity: TEntity) => boolean): TEntity[]
}
export class UserService {

    private __repo: UserRepository;
    private static __instance: UserService;

    private constructor(repo: UserRepository) {
        this.__repo = repo;
    }

    static GetService() {

        if (!this.__instance) {

            this.__instance = new UserService(UserRepository.GetRepo());
        }
        return this.__instance;
    }
    private GetBy(predicate: (entity: User) => boolean): User | null {
        return this.__repo.getBy(predicate) ?? null
    }
    private Some(predicate: (entity: User) => boolean): boolean {
        return this.__repo.some(predicate);
    }
    private GetAllBy(predicate: (entity: User) => boolean): User[] {
        return this.__repo.filter(predicate) ?? null;
    }
    Register(req: RegisterRequest): User {
        
        const IsExist = this.Some(user => user.email == req.email)
        
        if (IsExist) {
           
            throw new EmailHasBeenUsedAlready()
        }
        const hashedPassword = SecurityManager.hashPassword(req.password);
        
        const user = new User(
            req.permission.managerId,
            req.permission.bussinessId,
            RondomIdGenarator.CreateId(10),
            req.email,
            hashedPassword,
            req.name,
            req.surname
        )


        this.__repo.add(user)
        return user;
    }
    Login(request: LoginRequest): User {

        const user = this.__repo.getBy(e => e.email == request.email);
        if (!!user) {
            const password = request.password
            const IsVerified = SecurityManager.VerifyPassword(password, user.password)
            if (IsVerified) {
                return user;
            }
            else {
                throw new WrongPasswordEntered()
            }
        }
        else {
            throw new EmailHasNotFound()
        }

    }


}



export class AppContextManagementService {

    private static __instance: AppContextManagementService
    private __contexts: { [bussinessId: string]: RoomContext[] }
    private __ioServer: IOServer
    private __menuRepository: MenuRepository
    private __bussinessConfigRepo: BussinessConfigRepository

    private constructor(ioServer: IOServer) {

        this.__contexts = {}
        this.__ioServer = ioServer;
        this.__menuRepository = MenuRepository.GetRepo();
        this.__bussinessConfigRepo = BussinessConfigRepository.GetRepo();
    }
    public static GetService(ioServer: IOServer) {

        if (!this.__instance) {
            this.__instance = new AppContextManagementService(ioServer);
        }
        return this.__instance;
    }

    private RemoveContext(context: RoomContext) {
        delete this.__contexts[context.bussinessId.value]
        context.Disconnect();
        context.Deconstruct();
    }
    private AddRoomContext(contex: RoomContext, id: BussinessId): void {

        if (Object.keys(this.__contexts).includes(id.value)) {

            const contexts = this.__contexts[id.value]
            if (!contexts.includes(contex)) {
                contexts.push(contex);
            }
        }
    }
    CreateRoomContextWithConfig(bussinessConfig: BussinessConfig, bussiness: Bussiness, roomId: RoomId): RoomContext {

        const roomConfig = bussinessConfig.GetRoomConfig(roomId);
        let menu = this.__menuRepository.getBy(e => e.id.IsEqualTo(roomConfig.menuId))
        const layout = new TableLayout(roomConfig.tableLayoutOption);
        const room = new Room(roomId);
        let context: RoomContext
        if (!!menu) {

            context = new RoomContext(menu, layout, room, bussiness);
        }
        else {
            menu = new Menu(roomConfig.menuId);
            this.__menuRepository.add(menu);
            context = new RoomContext(menu, layout, room, bussiness);
        }
        this.AddRoomContext(context, context.bussinessId);
        return context;
    }

    CreateRoomContext(bussiness: Bussiness): RoomContext {

        const bussinessConfig = new BussinessConfig(bussiness.id)
        const options: TableLayoutOption = {
            amount: 0,
            indexTableNumber: 0
        }
        const menuId = new MenuId(RondomIdGenarator.CreateId(7));
        const roomId = new RoomId(RondomIdGenarator.CreateId(15));
        bussinessConfig.AddNewRoomConfig(roomId, options, menuId);
        this.__bussinessConfigRepo.add(bussinessConfig);
        
        const layout = new TableLayout(options)
        const menu = new Menu(menuId);
        const room = new Room(roomId)
        this.__menuRepository.add(menu);
        const context = new RoomContext(menu, layout, room, bussiness);
        this.AddRoomContext(context, context.bussinessId)
        return context;
    }

}








