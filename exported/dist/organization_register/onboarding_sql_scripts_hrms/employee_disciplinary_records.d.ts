import { DataSource } from 'typeorm';
export declare class EmployeeDisciplinaryRecordsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createEmployeeDisciplinaryRecordsTable(schemaName: string): Promise<void>;
}
