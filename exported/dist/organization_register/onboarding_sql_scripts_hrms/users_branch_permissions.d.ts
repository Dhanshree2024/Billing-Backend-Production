import { DataSource } from 'typeorm';
export declare class UsersBranchPermissionScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createUsersBranchPermissionsTable(schemaName: string): Promise<void>;
}
