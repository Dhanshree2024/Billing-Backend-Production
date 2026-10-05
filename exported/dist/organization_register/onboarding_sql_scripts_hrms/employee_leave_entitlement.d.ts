import { DataSource } from 'typeorm';
export declare class EmployeeLeaveEntitlementScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createEmployeeLeaveEntitlementTable(schemaName: string): Promise<void>;
}
