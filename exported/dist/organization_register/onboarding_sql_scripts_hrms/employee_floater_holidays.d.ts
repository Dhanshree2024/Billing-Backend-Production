import { DataSource } from 'typeorm';
export declare class EmployeeFloaterLeaveScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createEmployeeFloaterLeaveTable(schemaName: string): Promise<void>;
}
