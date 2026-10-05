import { DataSource } from 'typeorm';
export declare class LeaveTypesScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createLeaveTypesTable(schemaName: string): Promise<void>;
}
