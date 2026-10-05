import { DataSource } from 'typeorm';
export declare class FamilyDetailsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createFamilyDetailsTable(schemaName: string): Promise<void>;
}
