import { DataSource } from 'typeorm';
export declare class LeaveApplicationScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createLeaveApplicationTable(schemaName: string): Promise<void>;
}
