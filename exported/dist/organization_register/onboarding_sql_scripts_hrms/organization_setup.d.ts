import { DataSource } from 'typeorm';
export declare class OrganizationSetupScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createOrganizationSetupTable(schemaName: string, organizationId: number): Promise<void>;
}
