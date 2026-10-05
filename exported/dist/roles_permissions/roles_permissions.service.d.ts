import { CreateRolesPermissionDto } from './dto/create-roles_permission.dto';
import { UpdateRolesPermissionDto } from './dto/update-roles_permission.dto';
import { Repository, DataSource } from 'typeorm';
import { DatabaseService } from 'src/dynamic-schema/database.service';
import { HttpStatus } from '@nestjs/common';
import { RolesPermission } from './entities/roles_permission.entity';
import { DeleteRoleDto } from './dto/delete-roles_permission.dto';
import { PermissionsRoles } from './entities/permissions.entity';
import { User } from 'src/organizational-profile/entity/organizational-user.entity';
import { UserRepository } from 'src/user/user.repository';
export declare class RolesPermissionsService {
    private rolesPermissionRepository;
    private permissionRepository;
    private readonly userRepo;
    private readonly dataSource;
    private readonly databaseService;
    private userRepository;
    constructor(rolesPermissionRepository: Repository<RolesPermission>, permissionRepository: Repository<PermissionsRoles>, userRepo: Repository<User>, dataSource: DataSource, databaseService: DatabaseService, userRepository: UserRepository);
    create(createRolesPermissionDto: CreateRolesPermissionDto): string;
    findAll(page: number, limit: number, searchQuery: string): Promise<{
        data: {
            permissions: any[];
            userCount: number;
            permissionCount: number;
            role_id: number;
            role_name: string;
            created_by: number;
            role_description: string;
            createdBy: User;
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
    getAllRoles(): Promise<RolesPermission[]>;
    fetchSingleRoleWithPermissions(deleteRoleDto: DeleteRoleDto): Promise<{
        status: number;
        message: string;
        data: {
            role_id: number;
            role_name: string;
            created_by: number;
            created_at: Date;
            updated_at: Date;
            is_active: boolean;
            is_deleted: boolean;
            is_compulsary: boolean;
            is_outside_organization: boolean;
            permissions: {
                permission_id: number;
                permissions: any;
                created_at: Date;
                updated_at: Date;
                is_active: boolean;
                is_deleted: boolean;
            }[];
        };
        error?: undefined;
    } | {
        status: number;
        message: string;
        error: any;
        data?: undefined;
    }>;
    update(id: number, updateRolesPermissionDto: UpdateRolesPermissionDto): string;
    createOrganizationRolesPermission(dto: CreateRolesPermissionDto, createdBy: number): Promise<{
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
    updateRoleWithPermissions(updateRoleDto: UpdateRolesPermissionDto): Promise<{
        role: RolesPermission;
        permissions: {
            [key: string]: any;
        }[];
    }>;
    deleteRoleWithPermissions(deleteRoleDto: DeleteRoleDto): Promise<{
        role: RolesPermission;
        permissions: PermissionsRoles[];
    }>;
    getAllRolesForDropdown(): Promise<{
        value: number;
        label: string;
    }[]>;
}
