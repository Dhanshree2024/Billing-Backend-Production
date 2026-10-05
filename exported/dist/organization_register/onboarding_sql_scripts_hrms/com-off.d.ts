import { DataSource } from 'typeorm';
export declare class CompOffRequestsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createCompOffRequestsTable(schemaName: string): Promise<void>;
}
