import { DataSource } from 'typeorm';
export declare class ShiftChangeRequestsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createShiftChangeRequestsTable(schemaName: string): Promise<void>;
}
