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
exports.PaymentMethod = void 0;
const typeorm_1 = require("typeorm");
let PaymentMethod = class PaymentMethod {
};
exports.PaymentMethod = PaymentMethod;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'method_id' }),
    __metadata("design:type", Number)
], PaymentMethod.prototype, "methodId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'method_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], PaymentMethod.prototype, "methodName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'method_code', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], PaymentMethod.prototype, "methodCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provider', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], PaymentMethod.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], PaymentMethod.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_order', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PaymentMethod.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], PaymentMethod.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], PaymentMethod.prototype, "updatedAt", void 0);
exports.PaymentMethod = PaymentMethod = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pricing', name: 'payment_methods' })
], PaymentMethod);
