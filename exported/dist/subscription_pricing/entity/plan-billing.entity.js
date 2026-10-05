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
exports.PlanBilling = void 0;
const typeorm_1 = require("typeorm");
const plan_entity_1 = require("./plan.entity");
const subscription_type_entity_1 = require("./subscription-type.entity");
let PlanBilling = class PlanBilling {
};
exports.PlanBilling = PlanBilling;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlanBilling.prototype, "billing_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], PlanBilling.prototype, "billing_cycle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PlanBilling.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PlanBilling.prototype, "discounted_percentage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PlanBilling.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PlanBilling.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.Plan, plan => plan.billings, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", plan_entity_1.Plan)
], PlanBilling.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PlanBilling.prototype, "subscription_type_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subscription_type_entity_1.SubscriptionType, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'subscription_type_id', referencedColumnName: 'type_id' }),
    __metadata("design:type", subscription_type_entity_1.SubscriptionType)
], PlanBilling.prototype, "subscriptionType", void 0);
exports.PlanBilling = PlanBilling = __decorate([
    (0, typeorm_1.Entity)({ name: 'plan_billings', schema: 'pricing' }),
    (0, typeorm_1.Unique)(['plan', 'billing_cycle'])
], PlanBilling);
