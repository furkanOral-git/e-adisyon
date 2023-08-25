import { BaseValueObject, IDomainEntity } from "../../DomainLayer/Common/Common.Abstracts"
import { IONameSpace } from "../../DomainLayer/Common/Common.ValueObjects"
import { Bussiness } from "../../DomainLayer/Domain.AcountManager/AcountManager.AggregateRoot"
import { TableLayout, TableLayoutOption } from "../../DomainLayer/Domain.Order/Order.AggregateRoot"
import { Menu } from "../../DomainLayer/Domain.Product/Product.AggregateRoot"
import { MenuId } from "../../DomainLayer/Domain.Product/Product.ValueObjects"
import { IOServer, Room } from "../../DomainLayer/Domain.Room/Room.AggregateRoot"
import { ParticipantClientModel, Participant } from "../../DomainLayer/Domain.Room/Room.Entities"
import { ParticipantId, RoomId } from "../../DomainLayer/Domain.Room/Room.ValueObjects"
import { LoginRequest, RegisterRequest} from "../../PresentationLayer/Requests"
import { EmailHasBeenUsedAlready, EmailHasNotFound, WrongPasswordEntered } from "../Errors"
import { UserRepository, MenuRepository, RoomConfigRepository } from "../Repositories"
import { RondomIdGenarator } from "../Tools"
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
    private __contexts: { [bussinessId: string]: RoomContext }
    private __ioServer: IOServer
    private __configRepo: RoomConfigRepository
    private __menuRepository: MenuRepository
    

    private constructor(ioServer: IOServer) {

        this.__contexts = {}
        this.__ioServer = ioServer;
        this.__configRepo = RoomConfigRepository.GetRepo();
        this.__menuRepository = MenuRepository.GetRepo();
    }
    public static GetService(ioServer: IOServer) {

        if (!this.__instance) {
            this.__instance = new AppContextManagementService(ioServer);
        }
        return this.__instance;
    }
    private AddContext(context: RoomContext) {

        this.__contexts[context.bussinessId.value] = context

    }
    private RemoveContext(context: RoomContext) {
        delete this.__contexts[context.bussinessId.value]
        context.Disconnect();
        context.Deconstruct();
    }
    GetAppContext(bussiness: Bussiness): RoomContext {

        if (Object.keys(this.__contexts).includes(bussiness.id.value)) {
            return this.__contexts[bussiness.id.value]
        }
        return this.CreateAppContext(bussiness);

    }
    private CreateAppContext(bussiness: Bussiness): RoomContext {

        let menu: Menu | null
        let layout: TableLayout;
        let room: Room | undefined
        let context: RoomContext


        const config = this.__configRepo.getBy(c => c.id.IsEqualTo(bussiness.id))
        const nameSpace = new IONameSpace(bussiness.id.value);

        if (!!config) {

            menu = this.__menuRepository.getBy(p => p.id.IsEqualTo(config.menuId));
            room = this.__ioServer.getBy(r => r.id.IsEqualTo(config.roomId))
            layout = new TableLayout(config.tableLayoutOption)

            if (!room) {
                room = new Room(config.roomId, nameSpace);
            }
            if (!menu) {
                menu = new Menu(config.menuId);
            }


        }
        else {

            const option: TableLayoutOption = {
                amount: 0,
                indexTableNumber: 0
            }
            layout = new TableLayout(option)
            const roomIdValue = RondomIdGenarator.CreateId(30)
            menu = new Menu(new MenuId(RondomIdGenarator.CreateId(5)))
            room = new Room(new RoomId(roomIdValue), nameSpace)

        }

        const model = new ParticipantClientModel(bussiness.getFirst().name, nameSpace);
        const builderParticipant = new Participant(new ParticipantId(RondomIdGenarator.CreateId(15)), model);
        room.AddParticipant(builderParticipant);
        context = new RoomContext(menu, layout, room, bussiness, this.__ioServer)
        this.AddContext(context)
        return context
    }

}







