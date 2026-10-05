"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRolesPermissionModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const organizational_user_entity_1 = require("../organizational-profile/entity/organizational-user.entity");
const public_billing_portal_user_entity_1 = require("../organization_register/entities/public_billing_portal_user.entity");
const register_user_login_entity_1 = require("../organization_register/entities/register-user-login.entity");
const sessions_entity_1 = require("../organizational-profile/public_schema_entity/sessions.entity");
const database_module_1 = require("../dynamic-schema/database.module");
const user_repository_1 = require("../user/user.repository");
const permissions_entity_1 = require("./entity/permissions.entity");
const role_entity_1 = require("./entity/role.entity");
const organization_roles_permission_controller_1 = require("./organization_roles_permission.controller");
const organization_roles_permission_service_1 = require("./organization_roles_permission.service");
let OrganizationRolesPermissionModule = class OrganizationRolesPermissionModule {
};
exports.OrganizationRolesPermissionModule = OrganizationRolesPermissionModule;
exports.OrganizationRolesPermissionModule = OrganizationRolesPermissionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION },
            }),
            typeorm_1.TypeOrmModule.forFeature([organizational_user_entity_1.User, role_entity_1.Roles, permissions_entity_1.Permission, sessions_entity_1.Session, register_user_login_entity_1.RegisterUserLogin, public_billing_portal_user_entity_1.BillingPortalUser]), database_module_1.DatabaseModule
        ],
        providers: [organization_roles_permission_service_1.OrganizationRolesPermissionService, user_repository_1.UserRepository],
        controllers: [organization_roles_permission_controller_1.OrganizationRolesPermissionController],
        exports: [organization_roles_permission_service_1.OrganizationRolesPermissionService],
    })
], OrganizationRolesPermissionModule);
