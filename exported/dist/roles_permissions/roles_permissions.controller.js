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
exports.RolesPermissionsController = void 0;
const common_1 = require("@nestjs/common");
const roles_permissions_service_1 = require("./roles_permissions.service");
const create_roles_permission_dto_1 = require("./dto/create-roles_permission.dto");
const update_roles_permission_dto_1 = require("./dto/update-roles_permission.dto");
const api_key_guard_1 = require("../auth/api-key.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const crypto_utils_1 = require("../common/encryption_decryption/crypto-utils");
const delete_roles_permission_dto_1 = require("./dto/delete-roles_permission.dto");
let RolesPermissionsController = class RolesPermissionsController {
    constructor(rolesPermissionsService) {
        this.rolesPermissionsService = rolesPermissionsService;
    }
    create(createRolesPermissionDto) {
        return this.rolesPermissionsService.create(createRolesPermissionDto);
    }
    async findAll(page = 1, limit = 10, searchQuery = '') {
        try {
            return this.rolesPermissionsService.findAll(page, limit, searchQuery);
        }
        catch (error) {
            return false;
        }
    }
    async getAllRoles() {
        try {
            const roles = await this.rolesPermissionsService.getAllRoles();
            return { success: true, data: roles };
        }
        catch (error) {
            console.error('Error in getAllRoles:', error);
            return { success: false, message: 'Failed to fetch roles.' };
        }
    }
    async fetchSingleRoleWithPermissions(deleteRoleDto, res) {
        const response = await this.rolesPermissionsService.fetchSingleRoleWithPermissions(deleteRoleDto);
        return res.status(response.status).json(response);
    }
    async createRoleWithPermissions(dto, req) {
        const createdBy = req.cookies.system_user_id;
        const encryptedUserId = (0, crypto_utils_1.decrypt)(createdBy.toString());
        if (!encryptedUserId) {
            throw new Error('User ID not found in cookies');
        }
        const userId = Number(encryptedUserId);
        if (isNaN(userId)) {
            throw new Error('Invalid decrypted user ID');
        }
        return this.rolesPermissionsService.createOrganizationRolesPermission(dto, userId);
    }
    async updateRoleWithPermissions(updateRoleDto, req, res) {
        const updatedRole = await this.rolesPermissionsService.updateRoleWithPermissions(updateRoleDto);
        return res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: 'Role and permissions updated successfully',
            data: updatedRole,
        });
    }
    async deleteRoleWithPermissions(deleteRoleDto, req, res) {
        const deletedRole = await this.rolesPermissionsService.deleteRoleWithPermissions(deleteRoleDto);
        return res.status(common_1.HttpStatus.OK).json({
            status: common_1.HttpStatus.OK,
            message: 'Role deleted successfully',
            data: deletedRole,
        });
    }
    async getAllRolesForDropdown() {
        try {
            const dropdownRoles = await this.rolesPermissionsService.getAllRolesForDropdown();
            return {
                status: true,
                message: 'Roles fetched successfully',
                data: dropdownRoles,
            };
        }
        catch (error) {
            return {
                status: false,
                message: 'Failed to fetch roles',
                error: error.message || error,
            };
        }
    }
};
exports.RolesPermissionsController = RolesPermissionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_roles_permission_dto_1.CreateRolesPermissionDto]),
    __metadata("design:returntype", void 0)
], RolesPermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getAll'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], RolesPermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('getAllRoles'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesPermissionsController.prototype, "getAllRoles", null);
__decorate([
    (0, common_1.Post)('fetch-single-role-permissions'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_roles_permission_dto_1.DeleteRoleDto, Object]),
    __metadata("design:returntype", Promise)
], RolesPermissionsController.prototype, "fetchSingleRoleWithPermissions", null);
__decorate([
    (0, common_1.Post)('insert_organization_role_permission'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_roles_permission_dto_1.CreateRolesPermissionDto, Object]),
    __metadata("design:returntype", Promise)
], RolesPermissionsController.prototype, "createRoleWithPermissions", null);
__decorate([
    (0, common_1.Post)('update-role-permissions'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_roles_permission_dto_1.UpdateRolesPermissionDto, Object, Object]),
    __metadata("design:returntype", Promise)
], RolesPermissionsController.prototype, "updateRoleWithPermissions", null);
__decorate([
    (0, common_1.Post)('delete-role-permissions'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_roles_permission_dto_1.DeleteRoleDto, Object, Object]),
    __metadata("design:returntype", Promise)
], RolesPermissionsController.prototype, "deleteRoleWithPermissions", null);
__decorate([
    (0, common_1.Get)('getAllRolesForDropdown'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard, jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesPermissionsController.prototype, "getAllRolesForDropdown", null);
exports.RolesPermissionsController = RolesPermissionsController = __decorate([
    (0, common_1.Controller)('roles-permissions'),
    __metadata("design:paramtypes", [roles_permissions_service_1.RolesPermissionsService])
], RolesPermissionsController);
