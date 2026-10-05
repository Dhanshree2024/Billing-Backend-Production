import { DataSource } from 'typeorm';
export declare class OrganizationHolidaysScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    OrganizationHolidaysTable(schemaName: string): Promise<void>;
}
