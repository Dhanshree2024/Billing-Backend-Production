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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingEngineController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const onboarding_engine_service_1 = require("./onboarding-engine.service");
const create_setup_task_dto_1 = require("./dto/create-setup-task.dto");
const create_setup_steps_dto_1 = require("./dto/create-setup-steps.dto");
const mark_setup_complete_dto_1 = require("./dto/mark-setup-complete.dto");
const common_2 = require("@nestjs/common");
const api_key_guard_1 = require("../auth/api-key.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let OnboardingEngineController = class OnboardingEngineController {
    constructor(service) {
        this.service = service;
    }
    async getCategories(body) {
        return this.service.getCategories();
    }
    async getTasksByCategory(body) {
        return this.service.getTasksByCategory(body.category_id);
    }
    async getAllTasks(organizationId, userId, roleId, page, limit, search, role, sortColumn, sortOrder) {
        console.log('👤 getAllTasks called with qwert roleId:', roleId, 'userId:', userId, 'organizationId:', organizationId);
        const result = await this.service.getAllTasks(organizationId, userId, roleId, page, limit, search, role, sortColumn, sortOrder);
        return {
            success: true,
            message: "Tasks fetched successfully",
            ...result
        };
    }
    async getSetupCompletions(page, limit, search) {
        const result = await this.service.getSetupCompletionsForAllOrgs(page || 1, limit || 10, search);
        return {
            success: true,
            message: 'Setup completions fetched successfully',
            ...result,
        };
    }
    async createTask(dto) {
        return this.service.createTask(dto);
    }
    async addSteps(dto) {
        return this.service.addStep(dto);
    }
    async markComplete(dto) {
        return this.service.markTaskComplete(dto);
    }
    async getOrganizationProgress(body) {
        return this.service.getOrganizationProgress(body.organization_id, body.plan_id);
    }
    async getUserProgress(body) {
        return this.service.getUserProgress(body.organization_id, body.user_id);
    }
    async getSetupDashboard(body) {
        return this.service.getSetupDashboard(body.organization_id, body.user_id, body.plan_id);
    }
    async initialize(body) {
        return this.service.initializeOrgSetup(body.organization_id, body.plan_id);
    }
    async getSteps(body) {
        return this.service.getTaskSteps(body.task_id);
    }
    async getSupportTasks(body) {
        return this.service.getSupportTasks(body);
    }
    async markOrgTaskComplete(dto) {
        const result = await this.service.markOrgTaskComplete(dto);
        return result;
    }
    async gettask(body) {
        return this.service.getTask(body.task_id);
    }
};
exports.OnboardingEngineController = OnboardingEngineController;
__decorate([
    (0, common_1.Post)('getCategories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('getTasksByCategories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "getTasksByCategory", null);
__decorate([
    (0, common_1.Post)('getAllTasks'),
    __param(0, (0, common_1.Body)('organizationId')),
    __param(1, (0, common_1.Body)('assetUserId')),
    __param(2, (0, common_1.Body)('roleId')),
    __param(3, (0, common_1.Body)('page')),
    __param(4, (0, common_1.Body)('limit')),
    __param(5, (0, common_1.Body)('search')),
    __param(6, (0, common_1.Body)('role')),
    __param(7, (0, common_1.Body)('sortColumn')),
    __param(8, (0, common_1.Body)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number, Number, String, Array, String, String]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Post)('getSetupCompletions'),
    __param(0, (0, common_1.Body)('page')),
    __param(1, (0, common_1.Body)('limit')),
    __param(2, (0, common_1.Body)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "getSetupCompletions", null);
__decorate([
    (0, common_1.Post)('createTask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_setup_task_dto_1.CreateSetupTaskDto]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "createTask", null);
__decorate([
    (0, common_1.Post)('addSteps'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_setup_steps_dto_1.CreateSetupStepDto]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "addSteps", null);
__decorate([
    (0, common_1.Post)('markComplete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mark_setup_complete_dto_1.MarkTaskCompleteDto]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "markComplete", null);
__decorate([
    (0, common_1.Post)('getOrganizationProgress'),
    (0, common_2.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "getOrganizationProgress", null);
__decorate([
    (0, common_1.Post)('getUserProgress'),
    (0, common_2.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "getUserProgress", null);
__decorate([
    (0, common_1.Post)('getSetupDashboard'),
    (0, common_2.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "getSetupDashboard", null);
__decorate([
    (0, common_1.Post)('initializeOrgSetup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "initialize", null);
__decorate([
    (0, common_1.Post)('getTaskSteps'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "getSteps", null);
__decorate([
    (0, common_1.Post)('getSupportTasks'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "getSupportTasks", null);
__decorate([
    (0, common_1.Post)('org-task-complete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "markOrgTaskComplete", null);
__decorate([
    (0, common_1.Post)('getTask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OnboardingEngineController.prototype, "gettask", null);
exports.OnboardingEngineController = OnboardingEngineController = __decorate([
    (0, swagger_1.ApiTags)('Setup Engine'),
    (0, common_1.Controller)('setup-engine'),
    __metadata("design:paramtypes", [onboarding_engine_service_1.OnboardingEngineService])
], OnboardingEngineController);
