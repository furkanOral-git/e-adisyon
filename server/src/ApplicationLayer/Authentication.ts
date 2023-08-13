import { LoginRequest, RegisterRequest } from "../PresentationLayer/Requests";
import { AuthenticationResponse } from "./Responses";

export class AuthenticationService {

    public static Register(req: RegisterRequest): AuthenticationResponse | null {
        return null;
    }
    public static Verify(req: LoginRequest): AuthenticationResponse | null {
        return null;
    }
}