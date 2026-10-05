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
exports.RegisterOrganization = void 0;
const org_subscription_entity_1 = require("../../subscription_pricing/entity/org_subscription.entity");
const typeorm_1 = require("typeorm");
const register_user_login_entity_1 = require("./register-user-login.entity");
let RegisterOrganization = class RegisterOrganization {
};
exports.RegisterOrganization = RegisterOrganization;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RegisterOrganization.prototype, "organization_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "organization_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "organization_schema_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RegisterOrganization.prototype, "industry_type_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "customer_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payment_term', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "payment_term", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gst_registered', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], RegisterOrganization.prototype, "gst_registered", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'gst_number', type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "gst_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], RegisterOrganization.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'organization_code',
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "organization_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "landmark", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RegisterOrganization.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => register_user_login_entity_1.RegisterUserLogin, (userLogin) => userLogin.organization),
    __metadata("design:type", Array)
], RegisterOrganization.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_subscription_entity_1.OrgSubscription, (subscription) => subscription.organization),
    __metadata("design:type", Array)
], RegisterOrganization.prototype, "subscriptions", void 0);
exports.RegisterOrganization = RegisterOrganization = __decorate([
    (0, typeorm_1.Entity)('register_organization', { schema: 'public' })
], RegisterOrganization);
