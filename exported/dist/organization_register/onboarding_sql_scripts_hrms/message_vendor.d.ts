import { DataSource } from 'typeorm';
export declare class MessageVendorScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createMessageVendorTable(schemaName: string): Promise<void>;
}
