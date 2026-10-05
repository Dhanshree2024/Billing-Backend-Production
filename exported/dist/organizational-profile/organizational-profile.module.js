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
exports.OrganizationalProfileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const department_entity_1 = require("./entity/department.entity");
const organizational_profile_entity_1 = require("./entity/organizational-profile.entity");
const organizational_user_entity_1 = require("./entity/organizational-user.entity");
const organizational_profile_controller_1 = require("./organizational-profile.controller");
const organizational_profile_service_1 = require("./organizational-profile.service");
const department_config_entity_1 = require("./public_schema_entity/department-config.entity");
const designations_config_entity_1 = require("./public_schema_entity/designations-config.entity");
const industry_types_entity_1 = require("./public_schema_entity/industry-types.entity");
const jwt_1 = require("@nestjs/jwt");
const database_module_1 = require("../dynamic-schema/database.module");
const user_repository_1 = require("../user/user.repository");
const dotenv = __importStar(require("dotenv"));
const register_organization_entity_1 = require("../organization_register/entities/register-organization.entity");
const register_user_login_entity_1 = require("../organization_register/entities/register-user-login.entity");
const branches_entity_1 = require("./entity/branches.entity");
const designations_entity_1 = require("./entity/designations.entity");
const organizational_vendors_entity_1 = require("./entity/organizational-vendors.entity");
const roles_entity_1 = require("./entity/roles.entity");
const auth_module_1 = require("../auth/auth.module");
const mail_module_1 = require("../common/mail/mail.module");
const roles_permission_entity_1 = require("../roles_permissions/entities/roles_permission.entity");
const roles_permissions_module_1 = require("../roles_permissions/roles_permissions.module");
const locations_entity_1 = require("./entity/locations.entity");
const pincode_entity_1 = require("./public_schema_entity/pincode.entity");
const sessions_entity_1 = require("./public_schema_entity/sessions.entity");
const setup_task_entity_1 = require("../onboarding-engine/entities/setup-task.entity");
const public_billing_portal_user_entity_1 = require("../organization_register/entities/public_billing_portal_user.entity");
const plan_services_mapping_entity_1 = require("../services/entity/plan_services_mapping.entity");
const billing_info_entity_1 = require("../subscription_pricing/entity/billing_info.entity");
const contact_sales_requests_entity_1 = require("../subscription_pricing/entity/contact_sales_requests.entity");
const offline_payment_requests_entity_1 = require("../subscription_pricing/entity/offline_payment_requests.entity");
const org_feature_overrides_entity_1 = require("../subscription_pricing/entity/org_feature_overrides.entity");
const org_subscription_entity_1 = require("../subscription_pricing/entity/org_subscription.entity");
const payment_mode_entity_1 = require("../subscription_pricing/entity/payment_mode.entity");
const payment_transaction_entity_1 = require("../subscription_pricing/entity/payment_transaction.entity");
const plan_feature_mapping_entity_1 = require("../subscription_pricing/entity/plan-feature-mapping.entity");
const plan_entity_1 = require("../subscription_pricing/entity/plan.entity");
const support_entity_1 = require("../subscription_pricing/entity/support.entity");
const organization_information_entity_1 = require("./public_schema_entity/organization-information.entity");
dotenv.config();
let OrganizationalProfileModule = class OrganizationalProfileModule {
};
exports.OrganizationalProfileModule = OrganizationalProfileModule;
exports.OrganizationalProfileModule = OrganizationalProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            }),
            typeorm_1.TypeOrmModule.forFeature([organizational_profile_entity_1.OrganizationalProfile, branches_entity_1.Branch, organizational_vendors_entity_1.OrganizationVendors,
                department_entity_1.Department, designations_entity_1.Designations, roles_entity_1.Roles, organizational_user_entity_1.User, industry_types_entity_1.IndustryTypes, roles_permission_entity_1.RolesPermission,
                department_config_entity_1.DepartmentConifg, designations_config_entity_1.DesignationsConfig, register_user_login_entity_1.RegisterUserLogin, register_organization_entity_1.RegisterOrganization, locations_entity_1.Locations, pincode_entity_1.Pincodes, sessions_entity_1.Session, plan_entity_1.Plan, org_subscription_entity_1.OrgSubscription, plan_feature_mapping_entity_1.PlanFeatureMapping, payment_mode_entity_1.PaymentMode, billing_info_entity_1.BillingInfo, offline_payment_requests_entity_1.OfflinePaymentRequest, payment_transaction_entity_1.PaymentTransaction, org_feature_overrides_entity_1.OrgFeatureOverride, contact_sales_requests_entity_1.ContactSalesRequest, plan_services_mapping_entity_1.PlanServiceMapping, support_entity_1.SupportTicket, setup_task_entity_1.SetupTask, public_billing_portal_user_entity_1.BillingPortalUser, organization_information_entity_1.OrganizationInformation
            ]), database_module_1.DatabaseModule, mail_module_1.MailModule, auth_module_1.AuthModule, roles_permissions_module_1.RolesPermissionsModule
        ],
        controllers: [organizational_profile_controller_1.OrganizationalProfileController],
        providers: [organizational_profile_service_1.OrganizationService, user_repository_1.UserRepository],
        exports: [organizational_profile_service_1.OrganizationService]
    })
], OrganizationalProfileModule);
