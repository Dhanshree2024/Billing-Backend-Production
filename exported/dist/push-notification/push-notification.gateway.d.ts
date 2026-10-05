import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class PushNotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private userSocketMap;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitToUser(userId: string, payload: any): void;
}
