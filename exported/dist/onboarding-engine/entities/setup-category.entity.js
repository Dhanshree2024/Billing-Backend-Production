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
exports.SetupCategory = void 0;
const typeorm_1 = require("typeorm");
const setup_task_entity_1 = require("./setup-task.entity");
let SetupCategory = class SetupCategory {
};
exports.SetupCategory = SetupCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint' }),
    __metadata("design:type", Number)
], SetupCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], SetupCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_type' }),
    __metadata("design:type", String)
], SetupCategory.prototype, "categoryType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', nullable: true }),
    __metadata("design:type", String)
], SetupCategory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_order', default: 1 }),
    __metadata("design:type", Number)
], SetupCategory.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], SetupCategory.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => setup_task_entity_1.SetupTask, (task) => task.category),
    __metadata("design:type", Array)
], SetupCategory.prototype, "tasks", void 0);
exports.SetupCategory = SetupCategory = __decorate([
    (0, typeorm_1.Entity)({ schema: 'onboarding_engine', name: 'setup_categories' })
], SetupCategory);
