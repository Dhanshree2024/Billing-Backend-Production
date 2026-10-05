import { DataSource } from 'typeorm';
export declare class UsersEducationScript {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    createUsersEducationTable(schemaName: string): Promise<void>;
}
