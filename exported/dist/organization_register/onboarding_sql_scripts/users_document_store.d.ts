import { DataSource } from 'typeorm';
export declare class UsersDocumentStoreScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createUsersDocumentStoreTable(schemaName: string): Promise<void>;
}
