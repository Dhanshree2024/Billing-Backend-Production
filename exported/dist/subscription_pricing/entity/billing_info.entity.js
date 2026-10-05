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
exports.BillingInfo = void 0;
const typeorm_1 = require("typeorm");
const org_subscription_entity_1 = require("../entity/org_subscription.entity");
const offline_payment_requests_entity_1 = require("./offline_payment_requests.entity");
const payment_methods_entity_1 = require("./payment_methods.entity");
const product_entity_1 = require("./product.entity");
let BillingInfo = class BillingInfo {
};
exports.BillingInfo = BillingInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BillingInfo.prototype, "billing_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], BillingInfo.prototype, "org_subscription_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => org_subscription_entity_1.OrgSubscription, (sub) => sub.billingInfo, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'org_subscription_id' }),
    __metadata("design:type", org_subscription_entity_1.OrgSubscription)
], BillingInfo.prototype, "orgSubscription", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], BillingInfo.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], BillingInfo.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "company_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], BillingInfo.prototype, "address_line1", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "address_line2", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], BillingInfo.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "postal_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], BillingInfo.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "gst_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "tax_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true, default: 'pending' }),
    __metadata("design:type", String)
], BillingInfo.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BillingInfo.prototype, "same_as_primary_contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'method_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], BillingInfo.prototype, "methodId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_methods_entity_1.PaymentMethod),
    (0, typeorm_1.JoinColumn)({ name: 'method_id' }),
    __metadata("design:type", payment_methods_entity_1.PaymentMethod)
], BillingInfo.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], BillingInfo.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], BillingInfo.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "orderplacedby", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "paymentterm", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], BillingInfo.prototype, "customerpo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], BillingInfo.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => offline_payment_requests_entity_1.OfflinePaymentRequest, (request) => request.billingInfo),
    __metadata("design:type", Array)
], BillingInfo.prototype, "offlineRequests", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], BillingInfo.prototype, "product", void 0);
exports.BillingInfo = BillingInfo = __decorate([
    (0, typeorm_1.Entity)('billing_info', { schema: 'pricing' })
], BillingInfo);
