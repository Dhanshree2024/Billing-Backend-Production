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
exports.OrgSubscription = void 0;
const reseller_entity_1 = require("../../resellers/entity/reseller.entity");
const typeorm_1 = require("typeorm");
const register_organization_entity_1 = require("../../organization_register/entities/register-organization.entity");
const billing_info_entity_1 = require("./billing_info.entity");
const offline_payment_requests_entity_1 = require("./offline_payment_requests.entity");
const payment_mode_entity_1 = require("./payment_mode.entity");
const payment_transaction_entity_1 = require("./payment_transaction.entity");
const plan_entity_1 = require("./plan.entity");
const product_entity_1 = require("./product.entity");
const renewal_entity_1 = require("./renewal.entity");
const subscription_type_entity_1 = require("./subscription-type.entity");
let OrgSubscription = class OrgSubscription {
};
exports.OrgSubscription = OrgSubscription;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "subscription_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "organization_profile_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "billing_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], OrgSubscription.prototype, "plan_billing_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], OrgSubscription.prototype, "sub_billing_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], OrgSubscription.prototype, "sub_order_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "subscription_type_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], OrgSubscription.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], OrgSubscription.prototype, "renewal_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], OrgSubscription.prototype, "payment_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "payment_mode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "discounted_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "grand_total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], OrgSubscription.prototype, "license_no", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], OrgSubscription.prototype, "invoice_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OrgSubscription.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OrgSubscription.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OrgSubscription.prototype, "is_trial_period", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], OrgSubscription.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], OrgSubscription.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OrgSubscription.prototype, "purchase_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OrgSubscription.prototype, "auto_renewal", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OrgSubscription.prototype, "is_activated", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'renewal_status', nullable: true }),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "renewal_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], OrgSubscription.prototype, "trial_period_unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "trial_period_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OrgSubscription.prototype, "trial_start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], OrgSubscription.prototype, "trial_expiry_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "grace_period", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OrgSubscription.prototype, "restrict_login", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "percentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], OrgSubscription.prototype, "reseller_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], OrgSubscription.prototype, "internal_reference", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", String)
], OrgSubscription.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        default: null,
    }),
    __metadata("design:type", Object)
], OrgSubscription.prototype, "order_pdf", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.Plan, (plan) => plan.subscriptions),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", plan_entity_1.Plan)
], OrgSubscription.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subscription_type_entity_1.SubscriptionType, (type) => type.subscriptions),
    (0, typeorm_1.JoinColumn)({ name: 'subscription_type_id', referencedColumnName: 'type_id' }),
    __metadata("design:type", subscription_type_entity_1.SubscriptionType)
], OrgSubscription.prototype, "subscriptionType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => billing_info_entity_1.BillingInfo, (billing) => billing.orgSubscription),
    __metadata("design:type", Array)
], OrgSubscription.prototype, "billingInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_transaction_entity_1.PaymentTransaction, (payment) => payment.orgSubscription),
    __metadata("design:type", Array)
], OrgSubscription.prototype, "paymentTransactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => offline_payment_requests_entity_1.OfflinePaymentRequest, (request) => request.orgSubscription),
    __metadata("design:type", Array)
], OrgSubscription.prototype, "offlineRequests", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => register_organization_entity_1.RegisterOrganization, (organization) => organization.subscriptions, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'organization_profile_id' }),
    __metadata("design:type", register_organization_entity_1.RegisterOrganization)
], OrgSubscription.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.plans),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], OrgSubscription.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => renewal_entity_1.RenewalStatus, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'renewal_status' }),
    __metadata("design:type", renewal_entity_1.RenewalStatus)
], OrgSubscription.prototype, "renewalStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_mode_entity_1.PaymentMode, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'payment_mode', referencedColumnName: 'payment_mode_id' }),
    __metadata("design:type", payment_mode_entity_1.PaymentMode)
], OrgSubscription.prototype, "paymentMode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reseller_entity_1.Reseller, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'reseller_id' }),
    __metadata("design:type", reseller_entity_1.Reseller)
], OrgSubscription.prototype, "reseller", void 0);
exports.OrgSubscription = OrgSubscription = __decorate([
    (0, typeorm_1.Entity)('org_subscriptions', { schema: 'pricing' })
], OrgSubscription);
