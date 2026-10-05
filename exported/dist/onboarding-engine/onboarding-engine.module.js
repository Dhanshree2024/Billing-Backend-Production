"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingEngineModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const mail_module_1 = require("../common/mail/mail.module");
const sms_module_1 = require("../common/sms/sms.module");
const database_module_1 = require("../dynamic-schema/database.module");
const public_actions_entity_1 = require("../organization_register/entities/public_actions.entity");
const public_billing_portal_user_entity_1 = require("../organization_register/entities/public_billing_portal_user.entity");
const public_modules_entity_1 = require("../organization_register/entities/public_modules.entity");
const public_submodules_entity_1 = require("../organization_register/entities/public_submodules.entity");
const register_organization_entity_1 = require("../organization_register/entities/register-organization.entity");
const register_user_login_entity_1 = require("../organization_register/entities/register-user-login.entity");
const sessions_entity_1 = require("../organizational-profile/public_schema_entity/sessions.entity");
const user_repository_1 = require("../user/user.repository");
const organization_setup_progress_entity_1 = require("./entities/organization-setup-progress.entity");
const plan_setup_task_entity_1 = require("./entities/plan-setup-task.entity");
const setup_category_entity_1 = require("./entities/setup-category.entity");
const setup_task_mappings_entity_1 = require("./entities/setup-task-mappings.entity");
const setup_task_step_entity_1 = require("./entities/setup-task-step.entity");
const setup_task_entity_1 = require("./entities/setup-task.entity");
const user_setup_progress_entity_1 = require("./entities/user-setup-progress.entity");
const onboarding_engine_controller_1 = require("./onboarding-engine.controller");
const onboarding_engine_service_1 = require("./onboarding-engine.service");
let OnboardingEngineModule = class OnboardingEngineModule {
};
exports.OnboardingEngineModule = OnboardingEngineModule;
exports.OnboardingEngineModule = OnboardingEngineModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            }),
            typeorm_1.TypeOrmModule.forFeature([
                setup_task_entity_1.SetupTask,
                setup_task_step_entity_1.SetupTaskStep,
                organization_setup_progress_entity_1.OrganizationSetupProgress,
                user_setup_progress_entity_1.UserSetupProgress,
                sessions_entity_1.Session,
                register_user_login_entity_1.RegisterUserLogin,
                public_billing_portal_user_entity_1.BillingPortalUser,
                setup_category_entity_1.SetupCategory,
                plan_setup_task_entity_1.PlanSetupTask,
                register_organization_entity_1.RegisterOrganization,
                setup_task_mappings_entity_1.SetupTaskMapping,
                public_submodules_entity_1.Submodule, public_modules_entity_1.PermissionModule, public_actions_entity_1.Action
            ]),
            database_module_1.DatabaseModule,
            sms_module_1.SmsModule,
            mail_module_1.MailModule,
            auth_module_1.AuthModule,
        ],
        controllers: [onboarding_engine_controller_1.OnboardingEngineController],
        providers: [onboarding_engine_service_1.OnboardingEngineService, user_repository_1.UserRepository],
    })
], OnboardingEngineModule);
