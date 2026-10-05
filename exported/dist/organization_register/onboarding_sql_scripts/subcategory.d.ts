import { DataSource } from 'typeorm';
export declare class SubCategoryScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createSubCategoryTable(schemaName: string): Promise<void>;
    insertAssetSubCategoryTable(schemaName: string, subCategories: {
        main_category_id: number;
        sub_category_name: string;
    }[]): Promise<void>;
}
