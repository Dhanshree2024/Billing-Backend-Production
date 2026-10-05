import { DataSource } from 'typeorm';
export declare class UserCompanyDetailsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createUserCompanyDetailsTable(schemaName: string): Promise<void>;
}
