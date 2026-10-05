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
exports.PaymentTransaction = void 0;
const typeorm_1 = require("typeorm");
const org_subscription_entity_1 = require("../entity/org_subscription.entity");
const payment_methods_entity_1 = require("../entity/payment_methods.entity");
let PaymentTransaction = class PaymentTransaction {
};
exports.PaymentTransaction = PaymentTransaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PaymentTransaction.prototype, "transaction_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PaymentTransaction.prototype, "org_subscription_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => org_subscription_entity_1.OrgSubscription, (sub) => sub.paymentTransactions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'org_subscription_id' }),
    __metadata("design:type", org_subscription_entity_1.OrgSubscription)
], PaymentTransaction.prototype, "orgSubscription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], PaymentTransaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, default: 'INR' }),
    __metadata("design:type", String)
], PaymentTransaction.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], PaymentTransaction.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 4, nullable: true }),
    __metadata("design:type", String)
], PaymentTransaction.prototype, "card_last4", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 7, nullable: true }),
    __metadata("design:type", String)
], PaymentTransaction.prototype, "card_expiry", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], PaymentTransaction.prototype, "card_holder_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], PaymentTransaction.prototype, "transaction_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], PaymentTransaction.prototype, "transaction_reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'method_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], PaymentTransaction.prototype, "methodId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_methods_entity_1.PaymentMethod, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'method_id', referencedColumnName: 'methodId' }),
    __metadata("design:type", payment_methods_entity_1.PaymentMethod)
], PaymentTransaction.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], PaymentTransaction.prototype, "paid_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], PaymentTransaction.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], PaymentTransaction.prototype, "updated_at", void 0);
exports.PaymentTransaction = PaymentTransaction = __decorate([
    (0, typeorm_1.Entity)('payment_transaction', { schema: 'pricing' })
], PaymentTransaction);
