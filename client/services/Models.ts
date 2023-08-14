export class IoClientModel {

   
    private __roomId: string;
    private __participantId: string;
    private __name: string;
    private __surname: string;
    public listeners: { [event: string]: (data: any) => void };

    private constructor(domain: string, port: number, roomId: string, participantId: string, name: string, surname: string) {

        this.listeners = {}
        this.__name = name;
        this.__surname = surname;
        this.__participantId = participantId;
        this.__roomId = roomId;
    }

    
}