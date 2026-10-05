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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const typeorm_1 = require("typeorm");
const organizational_user_entity_1 = require("../../organizational-profile/entity/organizational-user.entity");
const permissions_entity_1 = require("./permissions.entity");
const roles_permission_entity_1 = require("../../roles_permissions/entities/roles_permission.entity");
let Roles = class Roles {
};
exports.Roles = Roles;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'role_id' }),
    __metadata("design:type", Number)
], Roles.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_name' }),
    __metadata("design:type", String)
], Roles.prototype, "role_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_description' }),
    __metadata("design:type", String)
], Roles.prototype, "role_description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], Roles.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organizational_user_entity_1.User, user => user.role_id),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", organizational_user_entity_1.User)
], Roles.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Roles.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Roles.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Roles.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Roles.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_compulsary', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Roles.prototype, "is_compulsary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_outside_organization', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Roles.prototype, "is_outside_organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => permissions_entity_1.Permission, permission => permission.role),
    __metadata("design:type", Array)
], Roles.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organizational_user_entity_1.User, (user) => user.role_id),
    __metadata("design:type", Array)
], Roles.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: roles_permission_entity_1.RoleType,
        enumName: 'role_type_enum',
    }),
    __metadata("design:type", String)
], Roles.prototype, "role_type", void 0);
exports.Roles = Roles = __decorate([
    (0, typeorm_1.Entity)('organization_roles')
], Roles);
