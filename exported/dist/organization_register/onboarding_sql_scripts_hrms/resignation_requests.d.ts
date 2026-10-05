import { DataSource } from 'typeorm';
export declare class ResignationRequestScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createResignationRequestTable(schemaName: string): Promise<void>;
}
