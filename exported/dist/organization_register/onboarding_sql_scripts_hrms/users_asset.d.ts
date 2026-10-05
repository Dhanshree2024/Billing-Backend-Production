import { DataSource } from 'typeorm';
export declare class UsersAssetScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createUsersAssetTable(schemaName: string): Promise<void>;
}
