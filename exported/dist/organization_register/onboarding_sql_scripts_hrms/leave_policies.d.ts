import { DataSource } from 'typeorm';
export declare class LeavePoliciesScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createLeavePoliciesTable(schemaName: string): Promise<void>;
}
