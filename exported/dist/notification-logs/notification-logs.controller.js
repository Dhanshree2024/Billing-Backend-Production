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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationLogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notification_logs_service_1 = require("./notification-logs.service");
let NotificationLogsController = class NotificationLogsController {
    constructor(svc) {
        this.svc = svc;
    }
    async createMessage(dto) {
        try {
            const res = await this.svc.createMessage(dto);
            return { success: true, data: res };
        }
        catch (err) {
            throw new common_1.HttpException(err.message || 'Create message failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateMessage(id, dto) {
        try {
            const res = await this.svc.updateMessage(+id, dto);
            return { success: true, data: res };
        }
        catch (err) {
            throw new common_1.HttpException(err.message || 'Update message failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listMessages(q) {
        const res = await this.svc.listMessages(q);
        return { success: true, data: res };
    }
    async getMessage(id) {
        const res = await this.svc.getMessageById(+id);
        return { success: true, data: res };
    }
    async createDeliveryReceipt(dto) {
        try {
            const res = await this.svc.createDeliveryReceipt(dto);
            return { success: true, data: res };
        }
        catch (err) {
            throw new common_1.HttpException(err.message || 'Receipt create failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async resendMessage(id) {
        try {
            const res = await this.svc.resendMessage(+id);
            return { success: true, data: res };
        }
        catch (err) {
            throw new common_1.HttpException(err.message || 'Resend failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.NotificationLogsController = NotificationLogsController;
__decorate([
    (0, common_1.Post)('messages'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a notification message (or log entry)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationLogsController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Patch)('messages/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update message status / timestamps / error info' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationLogsController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.Get)('messages'),
    (0, swagger_1.ApiOperation)({ summary: 'List messages (filters: template, event, status, recipient, date)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationLogsController.prototype, "listMessages", null);
__decorate([
    (0, common_1.Get)('messages/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get single message' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationLogsController.prototype, "getMessage", null);
__decorate([
    (0, common_1.Post)('delivery-receipts'),
    (0, swagger_1.ApiOperation)({ summary: 'Create delivery receipt from vendor callback' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationLogsController.prototype, "createDeliveryReceipt", null);
__decorate([
    (0, common_1.Post)('messages/:id/resend'),
    (0, swagger_1.ApiOperation)({ summary: 'Resend a failed message (retry logic)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationLogsController.prototype, "resendMessage", null);
exports.NotificationLogsController = NotificationLogsController = __decorate([
    (0, swagger_1.ApiTags)('notification-logs'),
    (0, common_1.Controller)('notification-logs'),
    __metadata("design:paramtypes", [notification_logs_service_1.NotificationLogsService])
], NotificationLogsController);
