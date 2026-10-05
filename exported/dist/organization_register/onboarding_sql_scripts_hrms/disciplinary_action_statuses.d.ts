import { DataSource } from 'typeorm';
export declare class DisciplinaryActionStatusesScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createDisciplinaryActionStatusesTable(schemaName: string): Promise<void>;
}
