import { DataSource } from 'typeorm';
export declare class ShiftsSetupScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createShiftsSetuptable(schemaName: string): Promise<void>;
}
