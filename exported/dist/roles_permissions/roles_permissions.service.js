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
exports.RolesPermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const database_service_1 = require("../dynamic-schema/database.service");
const typeorm_2 = require("@nestjs/typeorm");
const common_2 = require("@nestjs/common");
const roles_permission_entity_1 = require("./entities/roles_permission.entity");
const permissions_entity_1 = require("./entities/permissions.entity");
const organizational_user_entity_1 = require("../organizational-profile/entity/organizational-user.entity");
const user_repository_1 = require("../user/user.repository");
let RolesPermissionsService = class RolesPermissionsService {
    constructor(rolesPermissionRepository, permissionRepository, userRepo, dataSource, databaseService, userRepository) {
        this.rolesPermissionRepository = rolesPermissionRepository;
        this.permissionRepository = permissionRepository;
        this.userRepo = userRepo;
        this.dataSource = dataSource;
        this.databaseService = databaseService;
        this.userRepository = userRepository;
    }
    create(createRolesPermissionDto) {
        return 'This action adds a new rolesPermission';
    }
    async findAll(page, limit, searchQuery) {
        try {
            let whereCondition = { is_active: true, is_deleted: false };
            if (searchQuery && searchQuery.trim() !== '') {
                whereCondition['role_name'] = (0, typeorm_1.ILike)(`%${searchQuery}%`);
            }
            const [results, total] = await this.rolesPermissionRepository
                .createQueryBuilder('organization_roles')
                .leftJoinAndSelect('organization_roles.createdBy', 'createdBy')
                .leftJoinAndSelect('organization_roles.permissions', 'permissions')
                .where(whereCondition)
                .orderBy('organization_roles.role_name', 'ASC')
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
            const rolesWithCounts = await Promise.all(results.map(async (role) => {
                const userCount = await this.userRepo.count({
                    where: { role_id: role.role_id, is_active: 1, is_deleted: 0 },
                });
                const flatPermissions = [];
                let permissionCount = 0;
                role.permissions.forEach((permEntity) => {
                    if (Array.isArray(permEntity.permissions)) {
                        permEntity.permissions.forEach((module) => {
                            if (module.children && Array.isArray(module.children)) {
                                module.children.forEach((child) => {
                                    flatPermissions.push({
                                        moduleName: module.moduleName,
                                        ...child,
                                    });
                                    const hasPermission = Object.entries(child).some(([key, value]) => ['edit', 'view', 'create', 'delete', 'export', 'fullaccess'].includes(key) &&
                                        value === true);
                                    if (hasPermission)
                                        permissionCount++;
                                });
                            }
                            else {
                                flatPermissions.push({
                                    moduleName: module.moduleName,
                                    ...module,
                                });
                                const hasPermission = Object.entries(module).some(([key, value]) => ['edit', 'view', 'create', 'delete', 'export', 'fullaccess'].includes(key) &&
                                    value === true);
                                if (hasPermission)
                                    permissionCount++;
                            }
                        });
                    }
                });
                return {
                    ...role,
                    permissions: flatPermissions,
                    userCount,
                    permissionCount,
                };
            }));
            return {
                data: rolesWithCounts,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw new Error('An error occurred while fetching roles.');
        }
    }
    async getAllRoles() {
        try {
            const roles = await this.rolesPermissionRepository
                .createQueryBuilder('organization_roles')
                .leftJoinAndSelect('organization_roles.createdBy', 'createdBy')
                .leftJoinAndSelect('organization_roles.permissions', 'permissions')
                .where({
                is_active: true,
                is_deleted: false
            })
                .orderBy('organization_roles.role_name', 'ASC')
                .getMany();
            return roles;
        }
        catch (error) {
            console.error('Error in getAllRoles:', error);
            throw new Error('An error occurred while fetching all roles.');
        }
    }
    async fetchSingleRoleWithPermissions(deleteRoleDto) {
        const { role_id } = deleteRoleDto;
        if (!role_id) {
            throw new common_1.BadRequestException('Role ID is required');
        }
        try {
            const role = await this.rolesPermissionRepository.findOne({
                where: { role_id: role_id, is_active: true, is_deleted: false },
                relations: ['permissions'],
            });
            if (!role) {
                return {
                    status: 404,
                    message: `Role with ID ${role_id} not found or inactive`,
                    data: null,
                };
            }
            return {
                status: 200,
                message: 'Role fetched successfully',
                data: {
                    role_id: role.role_id,
                    role_name: role.role_name,
                    created_by: role.created_by,
                    created_at: role.createdAt,
                    updated_at: role.updatedAt,
                    is_active: role.is_active,
                    is_deleted: role.is_deleted,
                    is_compulsary: role.is_compulsary,
                    is_outside_organization: role.is_outside_organization,
                    permissions: role.permissions.map(permission => ({
                        permission_id: permission.permission_id,
                        permissions: permission.permissions,
                        created_at: permission.createdAt,
                        updated_at: permission.updatedAt,
                        is_active: permission.is_active,
                        is_deleted: permission.is_deleted,
                    })),
                },
            };
        }
        catch (error) {
            return {
                status: 500,
                message: 'An error occurred while fetching the role',
                error: error.message,
            };
        }
    }
    update(id, updateRolesPermissionDto) {
        return `This action updates a #${id} rolesPermission`;
    }
    async createOrganizationRolesPermission(dto, createdBy) {
        const userExists = await this.userRepo.findOne({ where: { register_user_login_id: createdBy } });
        if (!userExists) {
            throw new common_2.HttpException({ status: common_2.HttpStatus.BAD_REQUEST, message: 'Invalid createdBy user ID' }, common_2.HttpStatus.BAD_REQUEST);
        }
        const existingRole = await this.rolesPermissionRepository.findOne({ where: { role_name: dto.role_name } });
        if (existingRole) {
            throw new common_2.HttpException({ status: common_2.HttpStatus.CONFLICT, message: `Role name '${dto.role_name}' already exists` }, common_2.HttpStatus.CONFLICT);
        }
        const role = this.rolesPermissionRepository.create({
            role_name: dto.role_name,
            created_by: userExists.user_id,
            is_compulsary: dto.is_compulsary,
            is_outside_organization: dto.is_outside_organization,
        });
        const savedRole = await this.rolesPermissionRepository.save(role);
        const permissionEntity = this.permissionRepository.create({
            role: savedRole,
            permissions: dto.permissions,
        });
        await this.permissionRepository.save(permissionEntity);
        return {
            status: common_2.HttpStatus.CREATED,
            message: 'Role and permissions created successfully',
            data: {
                role: {
                    role_id: savedRole.role_id,
                    role_name: savedRole.role_name,
                    created_by: savedRole.created_by,
                    created_at: savedRole.createdAt,
                    updated_at: savedRole.updatedAt,
                    is_active: savedRole.is_active,
                    is_deleted: savedRole.is_deleted,
                    is_compulsary: savedRole.is_compulsary,
                    is_outside_organization: savedRole.is_outside_organization,
                },
                permissions: {
                    permission_id: permissionEntity.permission_id,
                    role_id: savedRole.role_id,
                    permissions: permissionEntity.permissions,
                    created_at: permissionEntity.createdAt,
                    updated_at: permissionEntity.updatedAt,
                    is_active: permissionEntity.is_active,
                    is_deleted: permissionEntity.is_deleted,
                }
            }
        };
    }
    async updateRoleWithPermissions(updateRoleDto) {
        const { role_id, role_name, permissions, is_deleted, is_compulsary, is_outside_organization } = updateRoleDto;
        const role = await this.rolesPermissionRepository.findOne({
            where: { role_id },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${role_id} not found`);
        }
        role.role_name = role_name;
        role.is_compulsary = is_compulsary;
        role.is_outside_organization = is_outside_organization;
        if (typeof is_deleted !== 'undefined') {
            role.is_deleted = is_deleted;
        }
        await this.rolesPermissionRepository.save(role);
        if (permissions) {
            const permission = await this.permissionRepository.findOne({ where: { role_id } });
            if (!permission) {
                throw new common_1.NotFoundException(`Permissions for role ID ${role_id} not found`);
            }
            permission.permissions = permissions;
            await this.permissionRepository.save(permission);
        }
        return {
            role,
            permissions: permissions,
        };
    }
    async deleteRoleWithPermissions(deleteRoleDto) {
        const { role_id } = deleteRoleDto;
        if (!role_id) {
            throw new common_1.BadRequestException('Role ID is required and cannot be null');
        }
        const role = await this.rolesPermissionRepository.findOne({
            where: { role_id },
            relations: ['permissions'],
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${role_id} not found`);
        }
        role.is_deleted = true;
        role.is_active = false;
        await this.rolesPermissionRepository.save(role);
        const permission = await this.permissionRepository.findOne({ where: { role_id } });
        if (permission) {
            permission.is_deleted = true;
            permission.is_active = false;
            await this.permissionRepository.save(permission);
        }
        return {
            role,
            permissions: role.permissions,
        };
    }
    async getAllRolesForDropdown() {
        const roles = await this.rolesPermissionRepository.find({
            where: { is_active: true, is_deleted: false },
            order: { role_name: 'ASC' },
        });
        const dropdownRoles = roles.map((role) => ({
            value: role.role_id,
            label: role.role_name,
        }));
        return dropdownRoles;
    }
};
exports.RolesPermissionsService = RolesPermissionsService;
exports.RolesPermissionsService = RolesPermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(roles_permission_entity_1.RolesPermission)),
    __param(1, (0, typeorm_2.InjectRepository)(permissions_entity_1.PermissionsRoles)),
    __param(2, (0, typeorm_2.InjectRepository)(organizational_user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource,
        database_service_1.DatabaseService,
        user_repository_1.UserRepository])
], RolesPermissionsService);
