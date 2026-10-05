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
exports.PushNotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const in_app_notifications_entity_1 = require("./entity/in-app-notifications.entity");
const push_notification_gateway_1 = require("./push-notification.gateway");
const notification_logs_service_1 = require("../notification-logs/notification-logs.service");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
let PushNotificationService = class PushNotificationService {
    constructor(inAppRepo, gateway, notificationLogsService, httpService) {
        this.inAppRepo = inAppRepo;
        this.gateway = gateway;
        this.notificationLogsService = notificationLogsService;
        this.httpService = httpService;
    }
    async sendInAppNotification(params) {
        const { recipient, templateVersion, renderedBody, renderContext, eventId } = params;
        await this.createNotification({
            recipientType: recipient.recipient_type,
            recipientId: recipient.recipient_id,
            eventId,
            templateVersionId: templateVersion.version_id,
            title: templateVersion.subject || 'Notification',
            message: renderedBody,
            data: renderContext,
        });
        return { success: true };
    }
    async createNotification(params) {
        const notification = this.inAppRepo.create({
            recipient_type: params.recipientType,
            recipient_id: params.recipientId,
            event_id: params.eventId,
            template_version_id: params.templateVersionId,
            title: params.title,
            message: params.message,
            data: params.data,
            is_read: false,
            created_at: new Date(),
        });
        return await this.inAppRepo.save(notification);
    }
    async getNotifications(recipientId) {
        const list = await this.inAppRepo.find({
            where: { recipient_id: recipientId },
            order: { created_at: 'DESC' },
        });
        return {
            success: true,
            message: "Notifications fetched successfully",
            data: list
        };
    }
    async markAsRead(notificationId) {
        await this.inAppRepo.update(notificationId, {
            is_read: true,
        });
        return {
            success: true,
            message: "Notification marked as read"
        };
    }
    async getUnreadCount(recipientId) {
        const count = await this.inAppRepo.count({
            where: {
                recipient_id: recipientId,
                is_read: false,
            },
        });
        return {
            success: true,
            message: "Unread count fetched successfully",
            data: { count }
        };
    }
    async processPush(data) {
        const { recipient, templateVersion, renderedBody, renderContext, eventId, organization_id, redirect_key, redirect_params, } = data;
        console.log("🏢 Organization ID received in Push Service:", organization_id);
        const saved = await this.inAppRepo.save({
            recipient_type: recipient.recipient_type,
            recipient_id: recipient.recipient_id,
            event_id: eventId,
            template_version_id: templateVersion.version_id,
            title: templateVersion.subject || 'Notification',
            message: renderedBody,
            data: renderContext,
            is_read: false,
            created_at: new Date(),
        });
        console.log("📤 Sending notification to Asset API");
        const assetNotificationApi = `${process.env.ASSET_API_URL}/organizational-profile/create-notification`;
        console.log("📤 Sending notification to Asset API");
        console.log("🏢 Organization ID being sent:", organization_id);
        console.log("📡 Asset API URL:", assetNotificationApi);
        try {
            console.log("📤 Sending notification to Asset API");
            await (0, rxjs_1.firstValueFrom)(this.httpService.post(assetNotificationApi, {
                recipient_type: recipient.recipient_type,
                recipient_id: recipient.recipient_id,
                event_id: eventId,
                template_version_id: templateVersion.version_id,
                title: saved.title,
                message: saved.message,
                data: renderContext,
                organization_id: organization_id,
                redirect_key: redirect_key,
                redirect_params: redirect_params,
            }));
            console.log("✅ Notification stored in Asset Backend");
        }
        catch (error) {
            console.error("❌ Error sending notification to Asset Backend:", error?.response?.data || error.message);
        }
        await this.notificationLogsService.updateStatusByTemplateVersion(templateVersion.version_id, recipient.recipient_id, 'sent');
        this.gateway.emitToUser(recipient.recipient_id, {
            id: saved.notification_id,
            title: saved.title,
            message: saved.message,
            created_at: saved.created_at,
        });
    }
};
exports.PushNotificationService = PushNotificationService;
exports.PushNotificationService = PushNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(in_app_notifications_entity_1.InAppNotifications)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        push_notification_gateway_1.PushNotificationGateway,
        notification_logs_service_1.NotificationLogsService,
        axios_1.HttpService])
], PushNotificationService);
