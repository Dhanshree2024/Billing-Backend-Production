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
exports.SetupTaskMapping = void 0;
const typeorm_1 = require("typeorm");
const setup_task_entity_1 = require("./setup-task.entity");
const public_submodules_entity_1 = require("../../organization_register/entities/public_submodules.entity");
const public_modules_entity_1 = require("../../organization_register/entities/public_modules.entity");
const public_actions_entity_1 = require("../../organization_register/entities/public_actions.entity");
let SetupTaskMapping = class SetupTaskMapping {
};
exports.SetupTaskMapping = SetupTaskMapping;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], SetupTaskMapping.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'task_id', type: 'bigint' }),
    __metadata("design:type", Number)
], SetupTaskMapping.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => setup_task_entity_1.SetupTask, (task) => task.mappings, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'task_id' }),
    __metadata("design:type", setup_task_entity_1.SetupTask)
], SetupTaskMapping.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'module', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], SetupTaskMapping.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => public_modules_entity_1.PermissionModule, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'module' }),
    __metadata("design:type", public_modules_entity_1.PermissionModule)
], SetupTaskMapping.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sub_module', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], SetupTaskMapping.prototype, "subModuleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => public_submodules_entity_1.Submodule, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'sub_module' }),
    __metadata("design:type", public_submodules_entity_1.Submodule)
], SetupTaskMapping.prototype, "subModule", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'action', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], SetupTaskMapping.prototype, "actionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => public_actions_entity_1.Action, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'action' }),
    __metadata("design:type", public_actions_entity_1.Action)
], SetupTaskMapping.prototype, "action", void 0);
exports.SetupTaskMapping = SetupTaskMapping = __decorate([
    (0, typeorm_1.Entity)('setup_task_mappings', { schema: 'onboarding_engine' })
], SetupTaskMapping);
