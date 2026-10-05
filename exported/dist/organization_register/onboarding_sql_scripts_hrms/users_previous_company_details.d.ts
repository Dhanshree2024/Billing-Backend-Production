import { DataSource } from 'typeorm';
export declare class UsersPerviousCompanyDetailsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createUsersPerviousCompanyDetailsTable(schemaName: string): Promise<void>;
}
