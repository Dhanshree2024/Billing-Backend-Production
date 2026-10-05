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
exports.NotificationEventsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notification_events_service_1 = require("./notification-events.service");
const render_notification_service_1 = require("./render-notification.service");
const create_notification_event_dto_1 = require("./dto/create-notification-event.dto");
const update_notification_event_dto_1 = require("./dto/update-notification-event.dto");
const update_integration_type_dto_1 = require("./dto/update-integration-type.dto");
const create_integration_type_dto_1 = require("./dto/create-integration-type.dto");
const create_notification_template_version_dto_1 = require("./dto/create-notification-template-version.dto");
const enabledisabletemplateversion_dto_1 = require("./dto/enabledisabletemplateversion.dto");
const enums_1 = require("./enums/enums");
const update_notification_template_version_dto_1 = require("./dto/update-notification-template-version.dto");
let NotificationEventsController = class NotificationEventsController {
    constructor(service, orchestratorService) {
        this.service = service;
        this.orchestratorService = orchestratorService;
    }
    async getAllEvents(page = 1, limit = 10, search, status) {
        return this.service.getAllEvents({
            page: Number(page),
            limit: Number(limit),
            search,
            status,
        });
    }
    create(dto) {
        return this.service.create(dto);
    }
    async getAllIntegrationTypes(page = 1, limit = 10, search, status) {
        return this.service.getAllIntegrationTypes({
            page: Number(page),
            limit: Number(limit),
            search,
            status,
        });
    }
    createIntegrationType(dto) {
        return this.service.createIntegrationType(dto);
    }
    updateIntegrationType(id, dto) {
        return this.service.UpdateIntegrationType(id, dto);
    }
    async removeIntegrationType(id) {
        return this.service.removeIntegrationType(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    async remove(id) {
        return this.service.remove(id);
    }
    async getAllNotificationTemplates(page = 1, limit = 10, search, status, eventId) {
        return this.service.getAllNotificationTemplates({
            page: Number(page),
            limit: Number(limit),
            search,
            status,
            eventId: eventId ? Number(eventId) : undefined,
        });
    }
    async getTemplates(page = 1, limit = 10, search, status) {
        return this.service.getTemplates(+page, +limit, search, status);
    }
    async createTemplate(body) {
        return this.service.createTemplate(body);
    }
    async updateTemplate(id, body) {
        return this.service.updateTemplate(+id, body);
    }
    async createVersion(dto) {
        console.log("Controller received DTO:", dto);
        console.log("Type checks:", {
            template_id: typeof dto.template_id,
            vendor_id: typeof dto.vendor_id,
            version_no: typeof dto.version_no,
            created_by: typeof dto.created_by,
        });
        return await this.service.createTemplateVersion(dto);
    }
    async updateVersion(dto) {
        return await this.service.updateTemplateVersion(dto);
    }
    async getSingleVersion(version_id) {
        return this.service.getTemplateVersionById(version_id);
    }
    async deleteVersion(version_id, updated_by) {
        return this.service.deleteTemplateVersion(version_id, updated_by);
    }
    async enableDisableVersion(dto) {
        return this.service.enableDisableTemplateVersion(dto);
    }
    async getTemplateVersions(templateId, page = 1, limit = 10, state) {
        console.log('CONTROLLER HIT');
        return this.service.getTemplateVersions(templateId, page, limit, state);
    }
    async getVendorDropdown() {
        return this.service.getVendorDropdown();
    }
    async getTemplateDropdown() {
        return this.service.getTemplateDropdown();
    }
    async getMultiplePayloadSchemas(accountTypes) {
        let parsedAccountTypes;
        if (!accountTypes || accountTypes.toUpperCase() === 'ALL') {
            parsedAccountTypes = Object.values(enums_1.AccountTypesEnum);
        }
        else {
            parsedAccountTypes = accountTypes
                .split(',')
                .map(t => t.trim())
                .filter(t => t.length > 0);
            const invalidValues = parsedAccountTypes.filter(t => !Object.values(enums_1.AccountTypesEnum).includes(t));
            if (invalidValues.length > 0) {
                throw new common_1.BadRequestException(`Invalid account types: ${invalidValues.join(', ')}`);
            }
        }
        return this.service.getPayloadSchemaForMultiple(parsedAccountTypes);
    }
    async getEventDropdown() {
        return this.service.getEventDropdown();
    }
    async getChannelDropdown() {
        return this.service.getChannelDropdown();
    }
    async getNotificationsByEvent(event_id) {
        return this.service.getAllNotificationsByEvent(Number(event_id));
    }
    async getNotificationsByEventForAsset(event_id) {
        return this.service.getAllNotificationsByEvent(Number(event_id));
    }
    async triggerNotification(body) {
        console.log('🔥 TRIGGER API HIT 🔥');
        await this.orchestratorService.orchestrate(body);
        return {
            success: true,
            message: 'Notification orchestration triggered successfully',
        };
    }
    async getVendors(page = 1, limit = 10, search, status) {
        return this.service.getVendors(+page, +limit, search, status);
    }
    async getNotifications(recipientId) {
        return this.service.getNotifications(recipientId);
    }
    async getUnreadCount(recipientId) {
        return this.service.getUnreadCount(recipientId);
    }
    async markAsRead(notificationId) {
        const notifId = Number(notificationId);
        if (isNaN(notifId)) {
            throw new common_1.HttpException('Invalid notification ID', common_1.HttpStatus.BAD_REQUEST);
        }
        const notification = await this.service.markAsRead(notifId);
        if (!notification) {
            throw new common_1.HttpException('Notification not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { success: true, notification };
    }
    getRedirectOptions() {
        return {
            data: this.service.getRedirectOptions(),
        };
    }
    async createConfig(dto) {
        console.log('Controller received DTO:', dto);
        console.log('Type checks:', {
            event_id: typeof dto?.setting?.event_id,
            channel_id: typeof dto?.setting?.channel_id,
            quota_limit: typeof dto?.setting?.quota_limit,
        });
        return await this.service.createConfig(dto.setting, dto.triggers);
    }
    async updateConfig(dto) {
        console.log('Update DTO:', dto);
        console.log("RAW DTO:", dto);
        console.log("TYPE:", typeof dto);
        return await this.service.updateConfig(dto.setting.event_id, dto.setting.channel_id, dto.setting, dto.triggers);
    }
    async getConfig(event_id) {
        console.log('Fetching config for event_id:', event_id);
        return await this.service.getConfig(event_id);
    }
    async fetchEventWiseSettings(page = 1, limit = 10, search = "") {
        const data = await this.service.getAllSettingsByEvent({
            page: Number(page),
            limit: Number(limit),
            search,
        });
        return {
            success: true,
            message: "Fetched settings successfully",
            ...data,
        };
    }
};
exports.NotificationEventsController = NotificationEventsController;
__decorate([
    (0, common_1.Get)('events-list'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_event_dto_1.CreateNotificationEventDto]),
    __metadata("design:returntype", void 0)
], NotificationEventsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('integration-types-list'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getAllIntegrationTypes", null);
__decorate([
    (0, common_1.Post)('create-integration-type'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_integration_type_dto_1.CreateIntegrationTypeDto]),
    __metadata("design:returntype", void 0)
], NotificationEventsController.prototype, "createIntegrationType", null);
__decorate([
    (0, common_1.Post)('update-integration-type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_integration_type_dto_1.UpdateIntegrationTypeDto]),
    __metadata("design:returntype", void 0)
], NotificationEventsController.prototype, "updateIntegrationType", null);
__decorate([
    (0, common_1.Delete)('delete-integration-type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "removeIntegrationType", null);
__decorate([
    (0, common_1.Post)('update-event/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_notification_event_dto_1.UpdateNotificationEventDto]),
    __metadata("design:returntype", void 0)
], NotificationEventsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete-event/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('notification-templates-list'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getAllNotificationTemplates", null);
__decorate([
    (0, common_1.Get)('templates-list'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Post)('create-template'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Post)('update-template/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Post)('create-template-version'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_template_version_dto_1.CreateNotificationTemplateVersionDto]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "createVersion", null);
__decorate([
    (0, common_1.Post)('update-template-version'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_notification_template_version_dto_1.UpdateNotificationTemplateVersionDto]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "updateVersion", null);
__decorate([
    (0, common_1.Get)('get-single-template-version'),
    __param(0, (0, common_1.Query)('version_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getSingleVersion", null);
__decorate([
    (0, common_1.Delete)('delete-template-version'),
    __param(0, (0, common_1.Query)('version_id')),
    __param(1, (0, common_1.Query)('updated_by')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "deleteVersion", null);
__decorate([
    (0, common_1.Post)('enable-disable-template-version'),
    (0, swagger_1.ApiOperation)({ summary: 'Enable or disable a template version' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [enabledisabletemplateversion_dto_1.EnableDisableTemplateVersionDto]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "enableDisableVersion", null);
__decorate([
    (0, common_1.Get)('get-template-versions/:templateId'),
    __param(0, (0, common_1.Param)('templateId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getTemplateVersions", null);
__decorate([
    (0, common_1.Get)('vendor-dropdown'),
    (0, swagger_1.ApiOperation)({ summary: 'Get vendor id and name for dropdown' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getVendorDropdown", null);
__decorate([
    (0, common_1.Get)('template-dropdown'),
    (0, swagger_1.ApiOperation)({ summary: 'Get template id and name for dropdown' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getTemplateDropdown", null);
__decorate([
    (0, common_1.Get)('get-multiple-account-types-wise-payload-schema'),
    __param(0, (0, common_1.Query)('account_types')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getMultiplePayloadSchemas", null);
__decorate([
    (0, common_1.Get)('get-event-dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getEventDropdown", null);
__decorate([
    (0, common_1.Get)('get-channel-dropdown'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getChannelDropdown", null);
__decorate([
    (0, common_1.Get)('get-notifications-by-event'),
    __param(0, (0, common_1.Query)('event_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getNotificationsByEvent", null);
__decorate([
    (0, common_1.Get)('get-notifications-by-event-for-asset'),
    __param(0, (0, common_1.Query)('event_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getNotificationsByEventForAsset", null);
__decorate([
    (0, common_1.Post)('trigger-notification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "triggerNotification", null);
__decorate([
    (0, common_1.Get)('vendors-list'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getVendors", null);
__decorate([
    (0, common_1.Get)('in-app'),
    __param(0, (0, common_1.Query)('recipient_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)('in-app/unread-count'),
    __param(0, (0, common_1.Query)('recipient_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Post)(':id/mark-read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Get)('redirect-options'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationEventsController.prototype, "getRedirectOptions", null);
__decorate([
    (0, common_1.Post)('create-notification-config'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "createConfig", null);
__decorate([
    (0, common_1.Post)('update-notification-config'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "updateConfig", null);
__decorate([
    (0, common_1.Get)('get-notification-config'),
    __param(0, (0, common_1.Query)('event_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Get)("event-wise"),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationEventsController.prototype, "fetchEventWiseSettings", null);
exports.NotificationEventsController = NotificationEventsController = __decorate([
    (0, swagger_1.ApiTags)('Notification Events'),
    (0, common_1.Controller)('notification-events'),
    __metadata("design:paramtypes", [notification_events_service_1.NotificationEventsService,
        render_notification_service_1.NotificationsOrchestratorService])
], NotificationEventsController);
