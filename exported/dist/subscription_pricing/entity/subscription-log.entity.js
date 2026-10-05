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
exports.SubscriptionLog = void 0;
const typeorm_1 = require("typeorm");
const org_subscription_entity_1 = require("./org_subscription.entity");
let SubscriptionLog = class SubscriptionLog {
};
exports.SubscriptionLog = SubscriptionLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubscriptionLog.prototype, "log_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SubscriptionLog.prototype, "subscription_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SubscriptionLog.prototype, "organization_profile_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], SubscriptionLog.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SubscriptionLog.prototype, "old_data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], SubscriptionLog.prototype, "new_data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SubscriptionLog.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SubscriptionLog.prototype, "performed_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SubscriptionLog.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => org_subscription_entity_1.OrgSubscription),
    (0, typeorm_1.JoinColumn)({ name: 'subscription_id' }),
    __metadata("design:type", org_subscription_entity_1.OrgSubscription)
], SubscriptionLog.prototype, "subscription", void 0);
exports.SubscriptionLog = SubscriptionLog = __decorate([
    (0, typeorm_1.Entity)({ name: 'subscription_log', schema: 'pricing' })
], SubscriptionLog);
