import { DataSource } from 'typeorm';
export declare class OrganizationRolesScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createOrganizationRolesTable(schemaName: string): Promise<void>;
}
