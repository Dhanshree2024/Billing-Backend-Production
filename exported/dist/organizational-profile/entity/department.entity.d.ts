import { User } from './organizational-user.entity';
export declare class Department {
    departmentId: number;
    createdBy: User;
    departmentHead: User;
    departmentName: string;
    departmentHeadId: string;
    dept_description: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
    active: boolean;
    linked_designations: number[] | null;
}
