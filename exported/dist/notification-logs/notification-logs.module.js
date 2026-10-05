"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationLogsModule = void 0;
const common_1 = require("@nestjs/common");
const notification_logs_service_1 = require("./notification-logs.service");
const notification_logs_controller_1 = require("./notification-logs.controller");
const typeorm_1 = require("@nestjs/typeorm");
const notifications_messages_entity_1 = require("../notifications-events/entities/notifications_messages.entity");
const notification_delivery_receipts_entity_1 = require("../notifications-events/entities/notification_delivery_receipts.entity");
const notification_batches_entity_1 = require("../notifications-events/entities/notification_batches.entity");
const notifications_event_entity_1 = require("../notifications-events/entities/notifications-event.entity");
const notification_template_entity_1 = require("../notifications-events/entities/notification-template.entity");
const notification_template_version_entity_1 = require("../notifications-events/entities/notification-template-version.entity");
let NotificationLogsModule = class NotificationLogsModule {
};
exports.NotificationLogsModule = NotificationLogsModule;
exports.NotificationLogsModule = NotificationLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                notification_batches_entity_1.NotificationBatch,
                notification_delivery_receipts_entity_1.NotificationDeliveryReceipt, notifications_event_entity_1.NotificationEvent,
                notifications_messages_entity_1.NotificationMessage,
                notification_template_version_entity_1.NotificationTemplateVersion, notification_template_entity_1.NotificationTemplate
            ])],
        controllers: [notification_logs_controller_1.NotificationLogsController],
        providers: [notification_logs_service_1.NotificationLogsService],
        exports: [notification_logs_service_1.NotificationLogsService],
    })
], NotificationLogsModule);
