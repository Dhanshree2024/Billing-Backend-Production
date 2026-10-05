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
exports.OfflinePaymentRequest = void 0;
const typeorm_1 = require("typeorm");
const org_subscription_entity_1 = require("./org_subscription.entity");
const billing_info_entity_1 = require("./billing_info.entity");
const plan_entity_1 = require("./plan.entity");
let OfflinePaymentRequest = class OfflinePaymentRequest {
};
exports.OfflinePaymentRequest = OfflinePaymentRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OfflinePaymentRequest.prototype, "request_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OfflinePaymentRequest.prototype, "subscription_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => org_subscription_entity_1.OrgSubscription, (sub) => sub.offlineRequests, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "subscription_id" }),
    __metadata("design:type", org_subscription_entity_1.OrgSubscription)
], OfflinePaymentRequest.prototype, "orgSubscription", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OfflinePaymentRequest.prototype, "billing_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => billing_info_entity_1.BillingInfo, (billing) => billing.offlineRequests),
    (0, typeorm_1.JoinColumn)({ name: "billing_id" }),
    __metadata("design:type", billing_info_entity_1.BillingInfo)
], OfflinePaymentRequest.prototype, "billingInfo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OfflinePaymentRequest.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.Plan, (plan) => plan.offlineRequests),
    (0, typeorm_1.JoinColumn)({ name: "plan_id" }),
    __metadata("design:type", plan_entity_1.Plan)
], OfflinePaymentRequest.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        default: "pending",
    }),
    __metadata("design:type", String)
], OfflinePaymentRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OfflinePaymentRequest.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, default: "USD" }),
    __metadata("design:type", String)
], OfflinePaymentRequest.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], OfflinePaymentRequest.prototype, "reference_note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], OfflinePaymentRequest.prototype, "requested_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], OfflinePaymentRequest.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], OfflinePaymentRequest.prototype, "processed_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OfflinePaymentRequest.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], OfflinePaymentRequest.prototype, "approved_by", void 0);
exports.OfflinePaymentRequest = OfflinePaymentRequest = __decorate([
    (0, typeorm_1.Entity)("offline_payment_requests", { schema: "pricing" })
], OfflinePaymentRequest);
