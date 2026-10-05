declare class DepartmentPayload {
    value: string;
    label: string;
}
export declare class CreateDepartmentsDto {
    departmentIds: DepartmentPayload[];
    newDepartmentNames?: string[];
    existingDepartmentNames?: string[];
}
export {};
