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
exports.User = void 0;
const class_validator_1 = require("class-validator");
const public_billing_portal_user_entity_1 = require("../../organization_register/entities/public_billing_portal_user.entity");
const typeorm_1 = require("typeorm");
const branches_entity_1 = require("./branches.entity");
const department_entity_1 = require("./department.entity");
const designations_entity_1 = require("./designations.entity");
const organizational_profile_entity_1 = require("./organizational-profile.entity");
const roles_entity_1 = require("./roles.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "users_business_email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "organization_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organizational_profile_entity_1.OrganizationalProfile, (org) => org.users),
    (0, typeorm_1.JoinColumn)({
        name: 'organization_id',
        referencedColumnName: 'tenant_org_id',
    }),
    __metadata("design:type", organizational_profile_entity_1.OrganizationalProfile)
], User.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => department_entity_1.Department, (department) => department.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdDepartments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => department_entity_1.Department, (department) => department.departmentHead),
    __metadata("design:type", Array)
], User.prototype, "headDepartments", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'N' }),
    __metadata("design:type", String)
], User.prototype, "is_primary_user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "middle_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "user_alternative_contact_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "landmark", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "zip", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { array: true }),
    __metadata("design:type", Array)
], User.prototype, "branches", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => public_billing_portal_user_entity_1.BillingPortalUser),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", public_billing_portal_user_entity_1.BillingPortalUser)
], User.prototype, "added_by_user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "register_user_login_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => public_billing_portal_user_entity_1.BillingPortalUser, (billingUser) => billingUser.linkedUsers),
    (0, typeorm_1.JoinColumn)({
        name: 'register_user_login_id',
        referencedColumnName: 'user_id',
    }),
    __metadata("design:type", public_billing_portal_user_entity_1.BillingPortalUser)
], User.prototype, "billingUser", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => branches_entity_1.Branch, (branch) => branch.primaryUser),
    __metadata("design:type", branches_entity_1.Branch)
], User.prototype, "branchAsPrimary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "last_login", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], User.prototype, "department_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "designation_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "profile_image", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => roles_entity_1.Roles),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", roles_entity_1.Roles)
], User.prototype, "user_role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => designations_entity_1.Designations),
    (0, typeorm_1.JoinColumn)({ name: 'designation_id' }),
    __metadata("design:type", designations_entity_1.Designations)
], User.prototype, "user_designation", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'department_id' }),
    __metadata("design:type", department_entity_1.Department)
], User.prototype, "user_department", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], User.prototype, "is_department_head", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
