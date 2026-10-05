import { DataSource } from 'typeorm';
export declare class EmployeeShiftsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createEmployeeShiftsTable(schemaName: string): Promise<void>;
}
