import { VertificationInfo } from "../PresentationLayer/Requests";

export class VertificationService {

    private static __waitedVertifications: { [requestId: string]: VertificationInfo } = {}

    static async WaitForVertification(vertificationCode: string, requestId: string, email: string): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {

            const info = new VertificationInfo(email, vertificationCode)
            this.__waitedVertifications[requestId] = info
            let intervalCount: number = 0
            const intervalID = setInterval(() => {
                if (info.isAnswered) {

                }
                else {

                }
                intervalCount++
                //3dk = 180.000ms  intervalCount 30 tam 3dk  
            }, 6000)
        })

    }
    static Verify(vertificationCode: string, email: string) {

    }
}