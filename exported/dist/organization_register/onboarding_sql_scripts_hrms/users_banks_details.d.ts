import { DataSource } from 'typeorm';
export declare class UsersBankDetailsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createUsersBankDetailsTable(schemaName: string): Promise<void>;
}
