import { DataSource } from 'typeorm';
export declare class EmployeeStatusScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createEmployeeStatusTable(schemaName: string): Promise<void>;
}
