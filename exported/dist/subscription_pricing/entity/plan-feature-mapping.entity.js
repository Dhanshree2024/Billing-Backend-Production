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
exports.PlanFeatureMapping = void 0;
const typeorm_1 = require("typeorm");
const feature_entity_1 = require("./feature.entity");
const org_feature_overrides_entity_1 = require("./org_feature_overrides.entity");
const plan_entity_1 = require("./plan.entity");
const product_entity_1 = require("./product.entity");
let PlanFeatureMapping = class PlanFeatureMapping {
};
exports.PlanFeatureMapping = PlanFeatureMapping;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlanFeatureMapping.prototype, "mapping_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PlanFeatureMapping.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PlanFeatureMapping.prototype, "feature_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], PlanFeatureMapping.prototype, "feature_value", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PlanFeatureMapping.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PlanFeatureMapping.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'Active' }),
    __metadata("design:type", String)
], PlanFeatureMapping.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', nullable: true }),
    __metadata("design:type", Number)
], PlanFeatureMapping.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], PlanFeatureMapping.prototype, "is_trial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'Boolean' }),
    __metadata("design:type", String)
], PlanFeatureMapping.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.Plan, plan => plan.featureMappings, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", plan_entity_1.Plan)
], PlanFeatureMapping.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feature_entity_1.Feature, feature => feature.featureMappings, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'feature_id' }),
    __metadata("design:type", feature_entity_1.Feature)
], PlanFeatureMapping.prototype, "feature", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => org_feature_overrides_entity_1.OrgFeatureOverride, (override) => override.mapping),
    __metadata("design:type", Array)
], PlanFeatureMapping.prototype, "overrides", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], PlanFeatureMapping.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], PlanFeatureMapping.prototype, "feature_display_name", void 0);
exports.PlanFeatureMapping = PlanFeatureMapping = __decorate([
    (0, typeorm_1.Entity)({ name: 'plan_feature_mappings', schema: 'pricing' }),
    (0, typeorm_1.Unique)(['plan', 'feature'])
], PlanFeatureMapping);
