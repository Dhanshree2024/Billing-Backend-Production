import { DataSource } from 'typeorm';
export declare class DisciplinaryDocumentsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createDisciplinaryDocumentsTable(schemaName: string): Promise<void>;
}
