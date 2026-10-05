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
exports.Plan = void 0;
const typeorm_1 = require("typeorm");
const plan_billing_entity_1 = require("./plan-billing.entity");
const plan_feature_mapping_entity_1 = require("./plan-feature-mapping.entity");
const org_subscription_entity_1 = require("./org_subscription.entity");
const plan_setting_entity_1 = require("./plan_setting.entity");
const offline_payment_requests_entity_1 = require("./offline_payment_requests.entity");
const product_entity_1 = require("./product.entity");
const services_entity_1 = require("../../services/entity/services.entity");
const plan_services_mapping_entity_1 = require("../../services/entity/plan_services_mapping.entity");
let Plan = class Plan {
};
exports.Plan = Plan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Plan.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Plan.prototype, "plan_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Plan.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Plan.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Plan.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Plan.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Plan.prototype, "set_trial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "trial_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Plan.prototype, "trial_period", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "trial_period_unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Plan.prototype, "trial_period_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Plan.prototype, "trial_amount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plan_billing_entity_1.PlanBilling, billing => billing.plan),
    __metadata("design:type", Array)
], Plan.prototype, "billings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plan_feature_mapping_entity_1.PlanFeatureMapping, mapping => mapping.plan),
    __metadata("design:type", Array)
], Plan.prototype, "featureMappings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_subscription_entity_1.OrgSubscription, subscription => subscription.plan),
    __metadata("design:type", Array)
], Plan.prototype, "subscriptions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plan_setting_entity_1.PlanSetting, (setting) => setting.plan),
    __metadata("design:type", Array)
], Plan.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => offline_payment_requests_entity_1.OfflinePaymentRequest, (request) => request.plan),
    __metadata("design:type", Array)
], Plan.prototype, "offlineRequests", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', nullable: true }),
    __metadata("design:type", Number)
], Plan.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.plans, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], Plan.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => services_entity_1.Service, (service) => service.plan),
    __metadata("design:type", Array)
], Plan.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plan_services_mapping_entity_1.PlanServiceMapping, (mapping) => mapping.plan),
    __metadata("design:type", Array)
], Plan.prototype, "serviceMappings", void 0);
exports.Plan = Plan = __decorate([
    (0, typeorm_1.Entity)({ name: 'plans', schema: 'pricing' })
], Plan);
