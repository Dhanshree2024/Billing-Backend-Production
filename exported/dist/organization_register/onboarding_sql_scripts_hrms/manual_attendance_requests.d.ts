import { DataSource } from 'typeorm';
export declare class ManualAttendanceScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createManualAttendanceTable(schemaName: string): Promise<void>;
}
