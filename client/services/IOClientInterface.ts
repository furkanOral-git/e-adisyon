export interface IOClientInterface {

    connect(connectionSentence: (domain: string, port: number) => void): void;
    sendData(event: string, data: any): void
    listen(event: string, listener: (data: any) => void): void
    off(event: string): void
    disconnect(): void
}