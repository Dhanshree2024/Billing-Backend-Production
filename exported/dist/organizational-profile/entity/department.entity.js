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
exports.Department = void 0;
const typeorm_1 = require("typeorm");
const organizational_user_entity_1 = require("./organizational-user.entity");
let Department = class Department {
};
exports.Department = Department;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'department_id' }),
    __metadata("design:type", Number)
], Department.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => organizational_user_entity_1.User, (user) => user.createdDepartments),
    (0, typeorm_1.JoinColumn)({ name: 'created_by_id' }),
    __metadata("design:type", organizational_user_entity_1.User)
], Department.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => organizational_user_entity_1.User, (user) => user.headDepartments),
    (0, typeorm_1.JoinColumn)({ name: 'department_head_id' }),
    __metadata("design:type", organizational_user_entity_1.User)
], Department.prototype, "departmentHead", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department_name' }),
    __metadata("design:type", String)
], Department.prototype, "departmentName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'department_head_id' }),
    __metadata("design:type", String)
], Department.prototype, "departmentHeadId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dept_description' }),
    __metadata("design:type", String)
], Department.prototype, "dept_description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Department.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Department.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_deleted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Department.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Department.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Department.prototype, "linked_designations", void 0);
exports.Department = Department = __decorate([
    (0, typeorm_1.Entity)('departments')
], Department);
