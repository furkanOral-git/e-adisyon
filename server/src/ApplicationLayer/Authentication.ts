import { LoginRequest, RegisterRequest } from "../PresentationLayer/Requests";
import { User } from "./Entities";
import { ConfigRepository, UserRepository } from "./Repositories";
import { AuthenticationResponse, FailedAuthenticationResponse, SucceedAuthenticationResponse } from "./Responses";

export class AuthenticationService {

    public static Register(req: RegisterRequest): AuthenticationResponse {

        const repo = UserRepository.GetRepo()
        if (repo.some(u => u.email == req.email)) {
            return new FailedAuthenticationResponse("Bu email daha önce zaten kullanılmış!");
        }
        const user = new User(req.response.acountManagerId.value, req.response.bussinessId.value, req.email, req.password)
        repo.add(user);
        return new SucceedAuthenticationResponse(req.response.roomId)
    }

    public static Verify(req: LoginRequest): AuthenticationResponse {

        const configRepo = ConfigRepository.GetRepo();
        const userRepo = UserRepository.GetRepo();
        const user = userRepo.getBy(u => u.email == req.email && u.password == req.password);
        console.log("Login Çalıştı")
        if (!!user) {

            const referenceKey = configRepo.getKeyById(user.bussinessId)
            if (referenceKey.isExpired()) {
                return new FailedAuthenticationResponse("Hizmetin süresi dolmuştur!")
            }
            return new SucceedAuthenticationResponse(configRepo.getRoomIdById(user.bussinessId))
        }
        console.log("Direkt Failed Authentication Result Dönüyor user değeri null")
        return new FailedAuthenticationResponse("Email ya da şifrenizi yanlış girdiniz!")
    }
}