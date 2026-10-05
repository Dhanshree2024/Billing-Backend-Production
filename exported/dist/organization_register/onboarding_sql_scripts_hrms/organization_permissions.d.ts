import { DataSource } from 'typeorm';
export declare class OrganizationPermissionScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createOrganizationPermissionTable(schemaName: string): Promise<void>;
}
