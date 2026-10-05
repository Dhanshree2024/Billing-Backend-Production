import { DataSource } from 'typeorm';
export declare class InterviewsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createInterviewsTable(schemaName: string): Promise<void>;
}
