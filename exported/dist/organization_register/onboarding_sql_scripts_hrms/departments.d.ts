import { DataSource } from 'typeorm';
export declare class DepartmentsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createDepartmentsTable(schemaName: string): Promise<void>;
}
