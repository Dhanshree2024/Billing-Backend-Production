import { DataSource } from 'typeorm';
export declare class MisconductReasonsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createMisconductReasonsTable(schemaName: string): Promise<void>;
}
