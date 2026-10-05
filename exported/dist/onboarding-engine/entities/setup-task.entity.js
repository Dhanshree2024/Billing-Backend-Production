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
exports.SetupTask = void 0;
const typeorm_1 = require("typeorm");
const setup_category_entity_1 = require("./setup-category.entity");
const setup_task_step_entity_1 = require("./setup-task-step.entity");
const setup_task_mappings_entity_1 = require("./setup-task-mappings.entity");
let SetupTask = class SetupTask {
};
exports.SetupTask = SetupTask;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint' }),
    __metadata("design:type", Number)
], SetupTask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    __metadata("design:type", Number)
], SetupTask.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setup_category_entity_1.SetupCategory),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", setup_category_entity_1.SetupCategory)
], SetupTask.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => setup_task_step_entity_1.SetupTaskStep, (step) => step.task),
    __metadata("design:type", Array)
], SetupTask.prototype, "steps", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    __metadata("design:type", String)
], SetupTask.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', nullable: true }),
    __metadata("design:type", String)
], SetupTask.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'navigation_path', nullable: true }),
    __metadata("design:type", String)
], SetupTask.prototype, "navigationPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'icon', nullable: true }),
    __metadata("design:type", String)
], SetupTask.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'required_role' }),
    __metadata("design:type", String)
], SetupTask.prototype, "requiredRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estimated_time', nullable: true }),
    __metadata("design:type", String)
], SetupTask.prototype, "estimatedTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'auto_detectable', default: false }),
    __metadata("design:type", Boolean)
], SetupTask.prototype, "autoDetectable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_order' }),
    __metadata("design:type", Number)
], SetupTask.prototype, "displayOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], SetupTask.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => setup_task_mappings_entity_1.SetupTaskMapping, (mapping) => mapping.task),
    __metadata("design:type", Array)
], SetupTask.prototype, "mappings", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'task_scope',
        type: 'enum',
        enum: ['INDIVIDUAL', 'COMMON', 'ONE_TIME'],
        default: 'COMMON'
    }),
    __metadata("design:type", String)
], SetupTask.prototype, "taskScope", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_auto_complete', default: false }),
    __metadata("design:type", Boolean)
], SetupTask.prototype, "isAutoComplete", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completion_event_key', nullable: true }),
    __metadata("design:type", String)
], SetupTask.prototype, "completionEventKey", void 0);
exports.SetupTask = SetupTask = __decorate([
    (0, typeorm_1.Entity)({ schema: 'onboarding_engine', name: 'setup_tasks' })
], SetupTask);
