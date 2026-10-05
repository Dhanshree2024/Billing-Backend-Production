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
exports.OrgFeatureOverride = void 0;
const typeorm_1 = require("typeorm");
const feature_entity_1 = require("./feature.entity");
const plan_feature_mapping_entity_1 = require("./plan-feature-mapping.entity");
let OrgFeatureOverride = class OrgFeatureOverride {
};
exports.OrgFeatureOverride = OrgFeatureOverride;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrgFeatureOverride.prototype, "override_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrgFeatureOverride.prototype, "org_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrgFeatureOverride.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrgFeatureOverride.prototype, "feature_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrgFeatureOverride.prototype, "mapping_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], OrgFeatureOverride.prototype, "override_value", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], OrgFeatureOverride.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OrgFeatureOverride.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], OrgFeatureOverride.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], OrgFeatureOverride.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrgFeatureOverride.prototype, "default_value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_usage', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], OrgFeatureOverride.prototype, "currentUsage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_feature_mapping_entity_1.PlanFeatureMapping, (mapping) => mapping.overrides, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'mapping_id', referencedColumnName: 'mapping_id' }),
    __metadata("design:type", plan_feature_mapping_entity_1.PlanFeatureMapping)
], OrgFeatureOverride.prototype, "mapping", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feature_entity_1.Feature, (feature) => feature.featureMappings, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'feature_id', referencedColumnName: 'feature_id' }),
    __metadata("design:type", feature_entity_1.Feature)
], OrgFeatureOverride.prototype, "feature", void 0);
exports.OrgFeatureOverride = OrgFeatureOverride = __decorate([
    (0, typeorm_1.Entity)('limitations', { schema: 'pricing' })
], OrgFeatureOverride);
