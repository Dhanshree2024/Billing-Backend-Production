import { User } from './organizational-user.entity';
export declare class Roles {
    role_id: number;
    role_name: string;
    created_by: number;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
    is_deleted: boolean;
    is_active: boolean;
}
