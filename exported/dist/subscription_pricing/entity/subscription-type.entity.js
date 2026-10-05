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
exports.SubscriptionType = void 0;
const typeorm_1 = require("typeorm");
const org_subscription_entity_1 = require("./org_subscription.entity");
let SubscriptionType = class SubscriptionType {
};
exports.SubscriptionType = SubscriptionType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubscriptionType.prototype, "type_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], SubscriptionType.prototype, "type_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SubscriptionType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], SubscriptionType.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_subscription_entity_1.OrgSubscription, subscription => subscription.subscriptionType),
    __metadata("design:type", Array)
], SubscriptionType.prototype, "subscriptions", void 0);
exports.SubscriptionType = SubscriptionType = __decorate([
    (0, typeorm_1.Entity)({ name: 'subscription_types', schema: 'pricing' })
], SubscriptionType);
