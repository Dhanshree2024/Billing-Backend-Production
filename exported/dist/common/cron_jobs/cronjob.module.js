"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJobModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const register_user_login_entity_1 = require("../../organization_register/entities/register-user-login.entity");
const cronjob_service_1 = require("./cronjob.service");
const cronjob_controller_1 = require("./cronjob.controller");
const mail_module_1 = require("../mail/mail.module");
const org_subscription_entity_1 = require("../../subscription_pricing/entity/org_subscription.entity");
const register_organization_entity_1 = require("../../organization_register/entities/register-organization.entity");
const date_utils_1 = require("../date_format/date-utils");
const notification_helper_1 = require("../notifications/notification.helper");
const notification_module_1 = require("../notifications/notification.module");
const notification_log_entity_1 = require("../../notifications-events/entities/notification-log.entity");
const notification_trigger_entity_1 = require("../../notifications-events/entities/notification-trigger.entity");
const notification_setting_entity_1 = require("../../notifications-events/entities/notification-setting.entity");
const org_feature_overrides_entity_1 = require("../../subscription_pricing/entity/org_feature_overrides.entity");
let CronJobModule = class CronJobModule {
};
exports.CronJobModule = CronJobModule;
exports.CronJobModule = CronJobModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([org_subscription_entity_1.OrgSubscription, register_user_login_entity_1.RegisterUserLogin, register_organization_entity_1.RegisterOrganization, notification_log_entity_1.NotificationLog, notification_trigger_entity_1.NotificationTriggers, notification_setting_entity_1.NotificationSettings, org_feature_overrides_entity_1.OrgFeatureOverride]), mail_module_1.MailModule, notification_module_1.NotificationModule,
        ],
        providers: [cronjob_service_1.CronJobService, date_utils_1.DateFormatService, notification_helper_1.NotificationHelper],
        controllers: [cronjob_controller_1.CronJobController],
        exports: [cronjob_service_1.CronJobService],
    })
], CronJobModule);
