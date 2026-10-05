"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const activity_log_module_1 = require("../activity-log/activity-log.module");
const request_context_module_1 = require("../common/context/request-context.module");
const export_module_1 = require("../common/export/export.module");
const mail_module_1 = require("../common/mail/mail.module");
const notification_helper_1 = require("../common/notifications/notification.helper");
const notification_module_1 = require("../common/notifications/notification.module");
const organizational_profile_1 = require("../common/organizational-info/organizational-profile");
const database_module_1 = require("../dynamic-schema/database.module");
const org_overrides_entity_1 = require("../organization_register/entities/org_overrides.entity");
const public_billing_portal_user_entity_1 = require("../organization_register/entities/public_billing_portal_user.entity");
const public_subscription_entity_1 = require("../organization_register/entities/public_subscription.entity");
const register_organization_entity_1 = require("../organization_register/entities/register-organization.entity");
const register_user_login_entity_1 = require("../organization_register/entities/register-user-login.entity");
const branches_entity_1 = require("../organizational-profile/entity/branches.entity");
const organizational_profile_module_1 = require("../organizational-profile/organizational-profile.module");
const sessions_entity_1 = require("../organizational-profile/public_schema_entity/sessions.entity");
const plan_services_mapping_entity_1 = require("../services/entity/plan_services_mapping.entity");
const services_entity_1 = require("../services/entity/services.entity");
const user_repository_1 = require("../user/user.repository");
const billing_info_entity_1 = require("./entity/billing_info.entity");
const contact_sales_requests_entity_1 = require("./entity/contact_sales_requests.entity");
const feature_entity_1 = require("./entity/feature.entity");
const offline_payment_requests_entity_1 = require("./entity/offline_payment_requests.entity");
const org_feature_override_logs_entity_1 = require("./entity/org_feature_override_logs.entity");
const org_feature_overrides_entity_1 = require("./entity/org_feature_overrides.entity");
const org_subscription_entity_1 = require("./entity/org_subscription.entity");
const payment_methods_entity_1 = require("./entity/payment_methods.entity");
const payment_mode_entity_1 = require("./entity/payment_mode.entity");
const payment_transaction_entity_1 = require("./entity/payment_transaction.entity");
const plan_billing_entity_1 = require("./entity/plan-billing.entity");
const plan_feature_mapping_entity_1 = require("./entity/plan-feature-mapping.entity");
const plan_entity_1 = require("./entity/plan.entity");
const plan_setting_entity_1 = require("./entity/plan_setting.entity");
const product_entity_1 = require("./entity/product.entity");
const renewal_entity_1 = require("./entity/renewal.entity");
const subscription_log_entity_1 = require("./entity/subscription-log.entity");
const subscription_type_entity_1 = require("./entity/subscription-type.entity");
const support_entity_1 = require("./entity/support.entity");
const pdf_service_1 = require("./pdf.service");
const subscription_controller_1 = require("./subscription.controller");
const subscription_service_1 = require("./subscription.service");
let SubscriptionModule = class SubscriptionModule {
};
exports.SubscriptionModule = SubscriptionModule;
exports.SubscriptionModule = SubscriptionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            }),
            typeorm_1.TypeOrmModule.forFeature([
                branches_entity_1.Branch,
                public_subscription_entity_1.Subscription,
                org_subscription_entity_1.OrgSubscription,
                subscription_type_entity_1.SubscriptionType,
                plan_entity_1.Plan,
                plan_feature_mapping_entity_1.PlanFeatureMapping,
                plan_billing_entity_1.PlanBilling,
                feature_entity_1.Feature,
                subscription_log_entity_1.SubscriptionLog,
                billing_info_entity_1.BillingInfo,
                payment_transaction_entity_1.PaymentTransaction,
                org_feature_overrides_entity_1.OrgFeatureOverride,
                org_overrides_entity_1.OrgOverride,
                register_organization_entity_1.RegisterOrganization,
                org_feature_override_logs_entity_1.OrgFeatureOverrideLog,
                sessions_entity_1.Session,
                register_user_login_entity_1.RegisterUserLogin,
                plan_setting_entity_1.PlanSetting,
                offline_payment_requests_entity_1.OfflinePaymentRequest,
                payment_methods_entity_1.PaymentMethod,
                payment_mode_entity_1.PaymentMode,
                product_entity_1.Product,
                renewal_entity_1.RenewalStatus,
                contact_sales_requests_entity_1.ContactSalesRequest,
                services_entity_1.Service,
                plan_services_mapping_entity_1.PlanServiceMapping,
                support_entity_1.SupportTicket,
                public_billing_portal_user_entity_1.BillingPortalUser,
            ]),
            database_module_1.DatabaseModule,
            mail_module_1.MailModule,
            organizational_profile_module_1.OrganizationalProfileModule,
            notification_module_1.NotificationModule,
            request_context_module_1.RequestContextModule,
            activity_log_module_1.ActivityLogModule,
            export_module_1.ExportModule,
        ],
        controllers: [subscription_controller_1.SubscriptionController],
        providers: [
            subscription_service_1.SubscriptionService,
            user_repository_1.UserRepository,
            organizational_profile_1.OrganizationalProfileCommonData,
            notification_helper_1.NotificationHelper,
            pdf_service_1.PdfService,
        ],
        exports: [subscription_service_1.SubscriptionService],
    })
], SubscriptionModule);
