import { User } from './organizational-user.entity';
export declare class Designations {
    designation_id: number;
    designation_name: string;
    created_by_id: number;
    desg_description: string;
    parent_department: number;
    parentDepartment: User;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
    is_deleted: boolean;
    is_active: boolean;
}
