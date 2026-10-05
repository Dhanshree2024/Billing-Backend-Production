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
exports.Service = void 0;
const typeorm_1 = require("typeorm");
const plan_entity_1 = require("../../subscription_pricing/entity/plan.entity");
const product_entity_1 = require("../../subscription_pricing/entity/product.entity");
let Service = class Service {
};
exports.Service = Service;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'service_id' }),
    __metadata("design:type", Number)
], Service.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plan_id' }),
    __metadata("design:type", Number)
], Service.prototype, "planId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Service.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', default: false }),
    __metadata("design:type", Boolean)
], Service.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], Service.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.Plan),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", plan_entity_1.Plan)
], Service.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", plan_entity_1.Plan)
], Service.prototype, "product", void 0);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)({ name: 'services', schema: 'pricing' })
], Service);
