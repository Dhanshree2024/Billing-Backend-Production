import { DataSource } from 'typeorm';
export declare class CandidateStageNotesScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createCandidateStageNotesTable(schemaName: string): Promise<void>;
}
