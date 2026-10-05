import { DataSource } from 'typeorm';
export declare class AttendanceScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createAttendanceTable(schemaName: string): Promise<void>;
}
