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
exports.ActivityLog = exports.OperationStatus = exports.OperationType = exports.ModuleName = void 0;
const register_organization_entity_1 = require("../../organization_register/entities/register-organization.entity");
const register_user_login_entity_1 = require("../../organization_register/entities/register-user-login.entity");
const org_subscription_entity_1 = require("../../subscription_pricing/entity/org_subscription.entity");
const typeorm_1 = require("typeorm");
var ModuleName;
(function (ModuleName) {
    ModuleName["CUSTOMER"] = "CUSTOMER";
    ModuleName["ORGANIZATION"] = "ORGANIZATION";
    ModuleName["SUBSCRIPTION"] = "SUBSCRIPTION";
    ModuleName["PLAN"] = "PLAN";
    ModuleName["PAYMENT"] = "PAYMENT";
    ModuleName["INVOICE"] = "INVOICE";
    ModuleName["BILLING_INFORMATION"] = "BILLING_INFORMATION";
    ModuleName["PRODUCT"] = "PRODUCT";
    ModuleName["USER"] = "USER";
    ModuleName["AUTHENTICATION"] = "AUTHENTICATION";
})(ModuleName || (exports.ModuleName = ModuleName = {}));
var OperationType;
(function (OperationType) {
    OperationType["CREATE"] = "CREATE";
    OperationType["UPDATE"] = "UPDATE";
    OperationType["DELETE"] = "DELETE";
    OperationType["VERIFY"] = "VERIFY";
    OperationType["LOGIN"] = "LOGIN";
    OperationType["LOGOUT"] = "LOGOUT";
    OperationType["ASSIGN"] = "ASSIGN";
    OperationType["CHANGE"] = "CHANGE";
    OperationType["UPGRADE"] = "UPGRADE";
    OperationType["DOWNGRADE"] = "DOWNGRADE";
    OperationType["RENEW"] = "RENEW";
    OperationType["CANCEL"] = "CANCEL";
    OperationType["INITIATE_PAYMENT"] = "INITIATE_PAYMENT";
    OperationType["PAYMENT_SUCCESS"] = "PAYMENT_SUCCESS";
    OperationType["PAYMENT_FAILED"] = "PAYMENT_FAILED";
    OperationType["REFUND"] = "REFUND";
    OperationType["GENERATE"] = "GENERATE";
    OperationType["SEND"] = "SEND";
})(OperationType || (exports.OperationType = OperationType = {}));
var OperationStatus;
(function (OperationStatus) {
    OperationStatus["SUCCESS"] = "SUCCESS";
    OperationStatus["FAILED"] = "FAILED";
    OperationStatus["PENDING"] = "PENDING";
})(OperationStatus || (exports.OperationStatus = OperationStatus = {}));
let ActivityLog = class ActivityLog {
};
exports.ActivityLog = ActivityLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        name: 'activity_log_id',
        type: 'bigint',
    }),
    __metadata("design:type", Number)
], ActivityLog.prototype, "activity_log_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'organization_id',
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], ActivityLog.prototype, "organization_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => register_organization_entity_1.RegisterOrganization, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'organization_id' }),
    __metadata("design:type", register_organization_entity_1.RegisterOrganization)
], ActivityLog.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'subscription_id',
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], ActivityLog.prototype, "subscription_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => org_subscription_entity_1.OrgSubscription, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'subscription_id' }),
    __metadata("design:type", org_subscription_entity_1.OrgSubscription)
], ActivityLog.prototype, "subscription", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'payment_transaction_id',
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], ActivityLog.prototype, "payment_transaction_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_id',
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], ActivityLog.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => register_user_login_entity_1.RegisterUserLogin, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", register_user_login_entity_1.RegisterUserLogin)
], ActivityLog.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'module_name',
        type: 'enum',
        enum: ModuleName,
    }),
    __metadata("design:type", String)
], ActivityLog.prototype, "module_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operation_type',
        type: 'enum',
        enum: OperationType,
    }),
    __metadata("design:type", String)
], ActivityLog.prototype, "operation_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operation_status',
        type: 'enum',
        enum: OperationStatus,
        default: OperationStatus.SUCCESS,
    }),
    __metadata("design:type", String)
], ActivityLog.prototype, "operation_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'remarks',
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], ActivityLog.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'old_data',
        type: 'jsonb',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "old_data", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'new_data',
        type: 'jsonb',
        nullable: true,
    }),
    __metadata("design:type", Object)
], ActivityLog.prototype, "new_data", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ip_address',
        type: 'varchar',
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], ActivityLog.prototype, "ip_address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'user_agent',
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], ActivityLog.prototype, "user_agent", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'created_by',
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], ActivityLog.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => register_user_login_entity_1.RegisterUserLogin, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", register_user_login_entity_1.RegisterUserLogin)
], ActivityLog.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], ActivityLog.prototype, "created_at", void 0);
exports.ActivityLog = ActivityLog = __decorate([
    (0, typeorm_1.Entity)({
        schema: 'public',
        name: 'activity_log',
    })
], ActivityLog);
