import { LoginRequest, RegisterRequest } from "../PresentationLayer/Requests";
import { ConfigRepository } from "./Repositories";
import { AuthenticationResponse, SucceedAuthenticationResponse } from "./Responses";

export class AuthenticationService {

    public static Register(req: RegisterRequest): AuthenticationResponse {
        const repo = ConfigRepository.GetRepo();
        
        return new SucceedAuthenticationResponse();
    }
    public static Verify(req: LoginRequest): AuthenticationResponse | null {
        return null;
    }
}