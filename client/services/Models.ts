export class IoClientModel {

   
    private __roomId: string;
    private __participantId: string;
    private __name: string;
    private __surname: string;
    

    private constructor(roomId: string, participantId: string, name: string, surname: string) {

        
        this.__name = name;
        this.__surname = surname;
        this.__participantId = participantId;
        this.__roomId = roomId;
    }

    
}