import { DataSource } from 'typeorm';
export declare class DesignationScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createDesignationTable(schemaName: string): Promise<void>;
}
