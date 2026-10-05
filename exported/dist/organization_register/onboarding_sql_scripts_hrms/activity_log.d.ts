import { DataSource } from 'typeorm';
export declare class ActivityLogScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createActivityLogTable(schemaName: string): Promise<void>;
}
