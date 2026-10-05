import { DataSource } from 'typeorm';
export declare class ItemsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createItemsTable(schemaName: string): Promise<void>;
    insertAssetItemTable(schemaName: string, subCategories: {
        main_category_id: number;
        sub_category_id: number;
        asset_item_name: string;
        is_licensable: boolean;
        item_type: string;
    }[]): Promise<void>;
}
