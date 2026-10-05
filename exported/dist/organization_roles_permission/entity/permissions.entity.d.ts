import { Roles } from './role.entity';
export declare class Permission {
    permission_id: number;
    role_id: number;
    permissions: Record<string, any>;
    created_at: Date;
    updated_at: Date;
    is_active: boolean;
    is_deleted: boolean;
    role: Roles;
}
