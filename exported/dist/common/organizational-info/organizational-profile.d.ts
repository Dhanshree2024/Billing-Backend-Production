import { DataSource, Repository } from 'typeorm';
import { Request } from "express";
import { Subscription } from 'src/organization_register/entities/public_subscription.entity';
import { Branch } from 'src/organizational-profile/entity/branches.entity';
export declare class OrganizationalProfileCommonData {
    private readonly dataSource;
    private readonly subscriptionRepository;
    private readonly branchRepository;
    constructor(dataSource: DataSource, subscriptionRepository: Repository<Subscription>, branchRepository: Repository<Branch>);
    getOrganizationDetails(req: Request): Promise<{
        organizationName: string | null;
        loginUserId: number | null;
        organizationId: number;
    }>;
}
