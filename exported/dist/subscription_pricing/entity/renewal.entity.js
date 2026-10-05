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
exports.RenewalStatus = void 0;
const typeorm_1 = require("typeorm");
let RenewalStatus = class RenewalStatus {
};
exports.RenewalStatus = RenewalStatus;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'status_id' }),
    __metadata("design:type", Number)
], RenewalStatus.prototype, "status_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], RenewalStatus.prototype, "status_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], RenewalStatus.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], RenewalStatus.prototype, "is_deleted", void 0);
exports.RenewalStatus = RenewalStatus = __decorate([
    (0, typeorm_1.Entity)({ schema: 'pricing', name: 'renewal_status' })
], RenewalStatus);
