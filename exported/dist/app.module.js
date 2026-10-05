"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const cors_middleware_1 = require("./common/middleware/cors.middleware");
const organization_module_1 = require("./organization_register/organization.module");
const database_module_1 = require("./dynamic-schema/database.module");
const set_schema_middleware_1 = require("./dynamic-schema/set-schema.middleware");
const organizational_profile_module_1 = require("./organizational-profile/organizational-profile.module");
const schedule_1 = require("@nestjs/schedule");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const activity_log_module_1 = require("./activity-log/activity-log.module");
const request_context_module_1 = require("./common/context/request-context.module");
const cronjob_module_1 = require("./common/cron_jobs/cronjob.module");
const export_module_1 = require("./common/export/export.module");
const mail_module_1 = require("./common/mail/mail.module");
const notification_module_1 = require("./common/notifications/notification.module");
const sms_module_1 = require("./common/sms/sms.module");
const location_module_1 = require("./location/location.module");
const master_status_module_1 = require("./master-status/master-status.module");
const notification_logs_module_1 = require("./notification-logs/notification-logs.module");
const notification_events_module_1 = require("./notifications-events/notification-events.module");
const onboarding_engine_module_1 = require("./onboarding-engine/onboarding-engine.module");
const organization_roles_permission_module_1 = require("./organization_roles_permission/organization_roles_permission.module");
const locations_entity_1 = require("./organizational-profile/entity/locations.entity");
const pincode_entity_1 = require("./organizational-profile/public_schema_entity/pincode.entity");
const sessions_entity_1 = require("./organizational-profile/public_schema_entity/sessions.entity");
const profile_image_module_1 = require("./profile-image/profile-image.module");
const push_notification_module_1 = require("./push-notification/push-notification.module");
const resellers_module_1 = require("./resellers/resellers.module");
const roles_permissions_module_1 = require("./roles_permissions/roles_permissions.module");
const services_module_1 = require("./services/services.module");
const subscription_module_1 = require("./subscription_pricing/subscription.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply((0, cookie_parser_1.default)())
            .forRoutes('*');
        consumer
            .apply(cors_middleware_1.CorsMiddleware)
            .forRoutes('*');
        consumer.apply(set_schema_middleware_1.SetSchemaMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [
                    config_1.ConfigModule,
                    organization_module_1.OrganizationModule,
                    auth_module_1.AuthModule,
                    sms_module_1.SmsModule,
                    serve_static_1.ServeStaticModule.forRoot({
                        rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                        serveRoot: '/uploads',
                        serveStaticOptions: { index: false },
                    }),
                    schedule_1.ScheduleModule.forRoot(),
                    cronjob_module_1.CronJobModule,
                ],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE'),
                    autoLoadEntities: true,
                    synchronize: false,
                    logging: true,
                }),
                inject: [config_1.ConfigService],
            }),
            organization_module_1.OrganizationModule,
            auth_module_1.AuthModule,
            organizational_profile_module_1.OrganizationalProfileModule,
            database_module_1.DatabaseModule,
            roles_permissions_module_1.RolesPermissionsModule,
            mail_module_1.MailModule,
            organization_roles_permission_module_1.OrganizationRolesPermissionModule,
            profile_image_module_1.ProfileImageModule,
            locations_entity_1.Locations,
            subscription_module_1.SubscriptionModule,
            pincode_entity_1.Pincodes,
            sessions_entity_1.Session,
            resellers_module_1.ResellersModule,
            services_module_1.ServicesModule,
            notification_events_module_1.NotificationEventsModule,
            notification_logs_module_1.NotificationLogsModule,
            push_notification_module_1.PushNotificationModule,
            onboarding_engine_module_1.OnboardingEngineModule,
            request_context_module_1.RequestContextModule,
            notification_module_1.NotificationModule,
            location_module_1.LocationModule,
            activity_log_module_1.ActivityLogModule,
            master_status_module_1.MasterStatusModule,
            export_module_1.ExportModule,
        ],
        providers: [],
    })
], AppModule);
