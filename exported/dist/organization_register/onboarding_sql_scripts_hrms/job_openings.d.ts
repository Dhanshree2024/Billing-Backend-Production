import { DataSource } from 'typeorm';
export declare class JobOpeningsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createJobOpeningsTable(schemaName: string): Promise<void>;
}
