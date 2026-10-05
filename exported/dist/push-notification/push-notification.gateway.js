"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let PushNotificationGateway = class PushNotificationGateway {
    constructor() {
        this.userSocketMap = new Map();
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        console.log("🔌 New WebSocket Connection");
        console.log("Client ID:", client.id);
        console.log("UserID from query:", userId);
        if (userId) {
            this.userSocketMap.set(userId, client.id);
            console.log("🧠 User socket mapped:", userId);
        }
    }
    handleDisconnect(client) {
        console.log("❌ WebSocket Disconnected:", client.id);
        for (const [key, value] of this.userSocketMap.entries()) {
            if (value === client.id) {
                this.userSocketMap.delete(key);
                console.log("🧠 Socket mapping removed for user:", key);
            }
        }
    }
    emitToUser(userId, payload) {
        console.log("🚀 Emit Notification Attempt");
        console.log("UserID:", userId);
        console.log("Payload:", payload);
        const socketId = this.userSocketMap.get(userId);
        if (!socketId) {
            console.warn("⚠️ Socket not found for user:", userId);
            return;
        }
        console.log("🎯 Emitting to socket:", socketId);
        this.server.to(socketId).emit('bell-notification', payload);
    }
};
exports.PushNotificationGateway = PushNotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PushNotificationGateway.prototype, "server", void 0);
exports.PushNotificationGateway = PushNotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            credentials: true
        },
        path: '/socket.io',
        transports: ['polling', 'websocket'],
    })
], PushNotificationGateway);
