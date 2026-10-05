"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEventsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const dotenv = __importStar(require("dotenv"));
const notifications_event_entity_1 = require("./entities/notifications-event.entity");
const integration_type_entity_1 = require("./entities/integration-type.entity");
const notification_events_service_1 = require("./notification-events.service");
const notification_events_controller_1 = require("./notification-events.controller");
const render_notification_service_1 = require("./render-notification.service");
const database_module_1 = require("../dynamic-schema/database.module");
const mail_module_1 = require("../common/mail/mail.module");
const sms_module_1 = require("../common/sms/sms.module");
const auth_module_1 = require("../auth/auth.module");
const roles_permissions_module_1 = require("../roles_permissions/roles_permissions.module");
const notification_channel_entity_1 = require("./entities/notification-channel.entity");
const notification_template_version_entity_1 = require("./entities/notification-template-version.entity");
const notification_template_entity_1 = require("./entities/notification-template.entity");
const third_party_vendor_entity_1 = require("./entities/third-party-vendor.entity");
const axios_1 = require("@nestjs/axios");
const notification_batches_entity_1 = require("./entities/notification_batches.entity");
const notifications_messages_entity_1 = require("./entities/notifications_messages.entity");
const in_app_notifications_entity_1 = require("../push-notification/entity/in-app-notifications.entity");
const push_notification_module_1 = require("../push-notification/push-notification.module");
const notification_trigger_entity_1 = require("./entities/notification-trigger.entity");
const notification_setting_entity_1 = require("./entities/notification-setting.entity");
const notification_log_entity_1 = require("./entities/notification-log.entity");
dotenv.config();
let NotificationEventsModule = class NotificationEventsModule {
};
exports.NotificationEventsModule = NotificationEventsModule;
exports.NotificationEventsModule = NotificationEventsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            }),
            typeorm_1.TypeOrmModule.forFeature([
                notifications_event_entity_1.NotificationEvent,
                integration_type_entity_1.IntegrationType,
                notification_channel_entity_1.NotificationChannel,
                notification_template_version_entity_1.NotificationTemplateVersion,
                notification_template_entity_1.NotificationTemplate,
                third_party_vendor_entity_1.ThirdPartyVendor,
                notification_batches_entity_1.NotificationBatch,
                notifications_messages_entity_1.NotificationMessage,
                in_app_notifications_entity_1.InAppNotifications,
                notification_trigger_entity_1.NotificationTriggers,
                notification_setting_entity_1.NotificationSettings,
                notification_log_entity_1.NotificationLog
            ]),
            database_module_1.DatabaseModule,
            sms_module_1.SmsModule,
            mail_module_1.MailModule,
            auth_module_1.AuthModule,
            roles_permissions_module_1.RolesPermissionsModule,
            push_notification_module_1.PushNotificationModule,
        ],
        controllers: [notification_events_controller_1.NotificationEventsController],
        providers: [
            notification_events_service_1.NotificationEventsService,
            render_notification_service_1.NotificationsOrchestratorService,
        ],
        exports: [
            notification_events_service_1.NotificationEventsService,
            render_notification_service_1.NotificationsOrchestratorService,
        ],
    })
], NotificationEventsModule);
