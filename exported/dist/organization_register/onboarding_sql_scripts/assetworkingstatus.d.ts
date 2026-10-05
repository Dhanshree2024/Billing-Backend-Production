import { DataSource } from 'typeorm';
export declare class AssetWorkingStatusScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createAssetWorkingStatusTable(schemaName: string): Promise<void>;
    insertAssetWorkingStatusTable(schemaName: string, statuses: {
        working_status_type_name: string;
    }[]): Promise<void>;
}
