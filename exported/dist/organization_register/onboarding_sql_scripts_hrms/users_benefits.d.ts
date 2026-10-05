import { DataSource } from 'typeorm';
export declare class UsersBenefitsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createUsersBenefitsTable(schemaName: string): Promise<void>;
}
