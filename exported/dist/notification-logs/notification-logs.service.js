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
exports.NotificationLogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notifications_messages_entity_1 = require("../notifications-events/entities/notifications_messages.entity");
const notification_delivery_receipts_entity_1 = require("../notifications-events/entities/notification_delivery_receipts.entity");
let NotificationLogsService = class NotificationLogsService {
    constructor(messageRepo, receiptRepo) {
        this.messageRepo = messageRepo;
        this.receiptRepo = receiptRepo;
    }
    async createMessage(dto) {
        const created = this.messageRepo.create({ ...dto, created_at: new Date() });
        const saved = await this.messageRepo.save(created);
        return saved;
    }
    async updateMessage(id, dto) {
        const m = await this.messageRepo.findOne({ where: { message_id: id } });
        if (!m)
            throw new common_1.NotFoundException('Message not found');
        Object.assign(m, dto, { updated_at: new Date() });
        const saved = await this.messageRepo.save(m);
        return saved;
    }
    async listMessages(q) {
        return (await this.messageRepo.find({ take: 100 }));
    }
    async getMessageById(id) {
        const m = await this.messageRepo.findOne({ where: { message_id: id } });
        if (!m)
            throw new common_1.NotFoundException('Message not found');
        return m;
    }
    async createDeliveryReceipt(dto) {
        const msg = await this.messageRepo.findOne({ where: { message_id: dto.message_id } });
        if (!msg)
            throw new common_1.NotFoundException('Message not found');
        const created = this.receiptRepo.create({ ...dto, received_at: new Date() });
        const saved = await this.receiptRepo.save(created);
        if (dto.provider_status === 'DELIVERED' || dto.provider_status === 'delivered') {
            msg.status = 'delivered';
            msg.delivered_at = new Date();
        }
        else if (dto.provider_status === 'FAILED') {
            msg.status = 'failed';
            msg.failed_at = new Date();
        }
        await this.messageRepo.save(msg);
        return saved;
    }
    async resendMessage(messageId) {
        const msg = await this.messageRepo.findOne({ where: { message_id: messageId } });
        if (!msg)
            throw new common_1.NotFoundException('Message not found');
        if (msg.status !== 'failed' && msg.status !== 'delivered' && msg.status !== 'suppressed') {
        }
        msg.provider_message_id = null;
        msg.status = 'queued';
        msg.error_code = null;
        msg.error_message = null;
        msg.attempt_count = (msg.attempt_count || 0) + 1;
        msg.updated_at = new Date();
        const saved = await this.messageRepo.save(msg);
        return saved;
    }
    async updateStatusByTemplateVersion(templateVersionId, recipientId, status) {
        await this.messageRepo.update({
            template_version_id: templateVersionId,
            recipient_id: recipientId,
        }, {
            status,
            sent_at: status === 'sent' ? new Date() : null,
        });
        return { success: true };
    }
};
exports.NotificationLogsService = NotificationLogsService;
exports.NotificationLogsService = NotificationLogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notifications_messages_entity_1.NotificationMessage)),
    __param(1, (0, typeorm_1.InjectRepository)(notification_delivery_receipts_entity_1.NotificationDeliveryReceipt)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationLogsService);
