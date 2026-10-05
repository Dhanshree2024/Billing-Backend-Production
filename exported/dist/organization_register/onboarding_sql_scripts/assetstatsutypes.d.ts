import { DataSource } from 'typeorm';
export declare class AssetStatusTypesScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createAssetStatusTable(schemaName: string): Promise<void>;
    insertAssetStatusTable(schemaName: string, statuses: {
        status_type_name: string;
    }[]): Promise<void>;
}
