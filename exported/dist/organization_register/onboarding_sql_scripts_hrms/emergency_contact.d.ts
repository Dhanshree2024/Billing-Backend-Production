import { DataSource } from 'typeorm';
export declare class EmergencyContactsScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createEmergencyContactsTable(schemaName: string): Promise<void>;
}
