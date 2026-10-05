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
exports.IntegrationType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let IntegrationType = class IntegrationType {
};
exports.IntegrationType = IntegrationType;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IntegrationType.prototype, "integration_type_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WhatsApp' }),
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], IntegrationType.prototype, "integration_type_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'WhatsApp API Integration' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], IntegrationType.prototype, "integration_type_description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, typeorm_1.Column)({ type: 'smallint', default: 1 }),
    __metadata("design:type", Number)
], IntegrationType.prototype, "is_enabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], IntegrationType.prototype, "is_deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], IntegrationType.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], IntegrationType.prototype, "updated_at", void 0);
exports.IntegrationType = IntegrationType = __decorate([
    (0, typeorm_1.Entity)('integration_types', { schema: 'public' })
], IntegrationType);
