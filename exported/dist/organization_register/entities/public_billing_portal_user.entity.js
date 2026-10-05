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
exports.BillingPortalUser = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const register_organization_entity_1 = require("./register-organization.entity");
const organizational_user_entity_1 = require("../../organizational-profile/entity/organizational-user.entity");
let BillingPortalUser = class BillingPortalUser {
};
exports.BillingPortalUser = BillingPortalUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BillingPortalUser.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BillingPortalUser.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BillingPortalUser.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        name: 'users_business_email',
    }),
    __metadata("design:type", String)
], BillingPortalUser.prototype, "business_email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BillingPortalUser.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BillingPortalUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BillingPortalUser.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], BillingPortalUser.prototype, "otp_expiry", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BillingPortalUser.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BillingPortalUser.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BillingPortalUser.prototype, "passwordSet", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BillingPortalUser.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'N' }),
    __metadata("design:type", String)
], BillingPortalUser.prototype, "is_primary_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'N' }),
    __metadata("design:type", String)
], BillingPortalUser.prototype, "passwordReset", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BillingPortalUser.prototype, "organization_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => register_organization_entity_1.RegisterOrganization, (organization) => organization.users),
    (0, typeorm_1.JoinColumn)({
        name: 'organization_id',
    }),
    __metadata("design:type", register_organization_entity_1.RegisterOrganization)
], BillingPortalUser.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organizational_user_entity_1.User, (user) => user.added_by_user),
    __metadata("design:type", Array)
], BillingPortalUser.prototype, "createdUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organizational_user_entity_1.User, (user) => user.billingUser),
    __metadata("design:type", Array)
], BillingPortalUser.prototype, "linkedUsers", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BillingPortalUser.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BillingPortalUser.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BillingPortalUser.prototype, "asset_user_id", void 0);
exports.BillingPortalUser = BillingPortalUser = __decorate([
    (0, typeorm_1.Entity)('billing_portal_user', { schema: 'public' })
], BillingPortalUser);
