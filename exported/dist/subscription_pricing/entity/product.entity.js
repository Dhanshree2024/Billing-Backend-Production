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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const feature_entity_1 = require("./feature.entity");
const plan_entity_1 = require("./plan.entity");
const billing_info_entity_1 = require("./billing_info.entity");
const services_entity_1 = require("../../services/entity/services.entity");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'product_id' }),
    __metadata("design:type", Number)
], Product.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'is_deleted' }),
    __metadata("design:type", Boolean)
], Product.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'schema_initial', nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "schemaInitial", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feature_entity_1.Feature, feature => feature.product),
    __metadata("design:type", Array)
], Product.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plan_entity_1.Plan, plans => plans.product),
    __metadata("design:type", Array)
], Product.prototype, "plans", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => billing_info_entity_1.BillingInfo, (billing) => billing.product),
    __metadata("design:type", Array)
], Product.prototype, "billingInfos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => services_entity_1.Service, (service) => service.product),
    __metadata("design:type", Array)
], Product.prototype, "services", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pricing', name: 'products' })
], Product);
