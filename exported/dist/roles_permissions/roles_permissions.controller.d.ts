import { HttpStatus } from '@nestjs/common';
import { RolesPermissionsService } from './roles_permissions.service';
import { CreateRolesPermissionDto } from './dto/create-roles_permission.dto';
import { UpdateRolesPermissionDto } from './dto/update-roles_permission.dto';
import { Response } from 'express';
import { DeleteRoleDto } from './dto/delete-roles_permission.dto';
export declare class RolesPermissionsController {
    private readonly rolesPermissionsService;
    constructor(rolesPermissionsService: RolesPermissionsService);
    create(createRolesPermissionDto: CreateRolesPermissionDto): string;
    findAll(page?: number, limit?: number, searchQuery?: string): Promise<false | {
        data: {
            permissions: any[];
            userCount: number;
            permissionCount: number;
            role_id: number;
            role_name: string;
            created_by: number;
            role_description: string;
            createdBy: import("../organizational-profile/entity/organizational-user.entity").User;
            createdAt: Date;
            updatedAt: Date;
            is_deleted: boolean;
            is_active: boolean;
            is_compulsary: boolean;
            is_outside_organization: boolean;
            role_type: import("./entities/roles_permission.entity").RoleType;
        }[];
        total: number;
        currentPage: number;
        totalPages: number;
    }>;
    getAllRoles(): Promise<{
        success: boolean;
        data: import("./entities/roles_permission.entity").RolesPermission[];
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    fetchSingleRoleWithPermissions(deleteRoleDto: DeleteRoleDto, res: Response): Promise<Response<any, Record<string, any>>>;
    createRoleWithPermissions(dto: CreateRolesPermissionDto, req: any): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            role: {
                role_id: number;
                role_name: string;
                created_by: number;
                created_at: Date;
                updated_at: Date;
                is_active: boolean;
                is_deleted: boolean;
                is_compulsary: boolean;
                is_outside_organization: boolean;
            };
            permissions: {
                permission_id: number;
                role_id: number;
                permissions: any;
                created_at: Date;
                updated_at: Date;
                is_active: boolean;
                is_deleted: boolean;
            };
        };
    }>;
    updateRoleWithPermissions(updateRoleDto: UpdateRolesPermissionDto, req: any, res: any): Promise<any>;
    deleteRoleWithPermissions(deleteRoleDto: DeleteRoleDto, req: any, res: any): Promise<any>;
    getAllRolesForDropdown(): Promise<{
        status: boolean;
        message: string;
        data: {
            value: number;
            label: string;
        }[];
        error?: undefined;
    } | {
        status: boolean;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
