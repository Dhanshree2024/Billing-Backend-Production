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
exports.SetupTaskStep = void 0;
const typeorm_1 = require("typeorm");
const setup_task_entity_1 = require("./setup-task.entity");
let SetupTaskStep = class SetupTaskStep {
};
exports.SetupTaskStep = SetupTaskStep;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id', type: 'bigint' }),
    __metadata("design:type", Number)
], SetupTaskStep.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'task_id' }),
    __metadata("design:type", Number)
], SetupTaskStep.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setup_task_entity_1.SetupTask, (task) => task.steps),
    (0, typeorm_1.JoinColumn)({ name: 'task_id' }),
    __metadata("design:type", setup_task_entity_1.SetupTask)
], SetupTaskStep.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'step_order' }),
    __metadata("design:type", Number)
], SetupTaskStep.prototype, "stepOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', nullable: true }),
    __metadata("design:type", String)
], SetupTaskStep.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    __metadata("design:type", String)
], SetupTaskStep.prototype, "description", void 0);
exports.SetupTaskStep = SetupTaskStep = __decorate([
    (0, typeorm_1.Entity)({ schema: 'onboarding_engine', name: 'setup_task_steps' })
], SetupTaskStep);
