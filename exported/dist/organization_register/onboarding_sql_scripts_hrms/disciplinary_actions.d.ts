import { DataSource } from 'typeorm';
export declare class DisciplinaryActionsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createDisciplinaryActionsTable(schemaName: string): Promise<void>;
}
