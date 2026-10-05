import { DataSource } from 'typeorm';
export declare class ShiftsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createShiftsTable(schemaName: string): Promise<void>;
}
