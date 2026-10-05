import { DataSource, EntityTarget, Repository } from 'typeorm';
export declare function getTenantRepository<T>(dataSource: DataSource, entity: EntityTarget<T>, schema: string): Promise<Repository<T>>;
