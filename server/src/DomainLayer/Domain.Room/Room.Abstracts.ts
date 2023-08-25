export interface IOClientInterface {

    connect(connection: (url: string) => void): void;
    sendData(event: string, data: any): void
    listen(event: string, listener: (data: any) => void): void
    off(event: string): void
    disconnect(): void
}