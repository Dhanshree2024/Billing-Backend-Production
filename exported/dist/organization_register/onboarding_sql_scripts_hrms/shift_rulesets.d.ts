import { DataSource } from 'typeorm';
export declare class ShiftRulesetsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createShiftRulesetsable(schemaName: string): Promise<void>;
}
