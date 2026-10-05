import { User } from 'src/organizational-profile/entity/organizational-user.entity';
import { Permission } from './permissions.entity';
import { RoleType } from 'src/roles_permissions/entities/roles_permission.entity';
export declare class Roles {
    role_id: number;
    role_name: string;
    role_description: string;
    created_by: number;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
    is_deleted: boolean;
    is_active: boolean;
    is_compulsary: boolean;
    is_outside_organization: boolean;
    permissions: Permission[];
    users: User[];
    role_type: RoleType;
}
