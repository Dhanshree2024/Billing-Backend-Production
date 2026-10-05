import { DataSource, Repository } from 'typeorm';
import { BillingPortalUser } from 'src/organization_register/entities/public_billing_portal_user.entity';
export declare class UserRepository extends Repository<BillingPortalUser> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByEmail(business_email: string): Promise<BillingPortalUser>;
    validatePassword(password: string, hash: string): Promise<boolean>;
    findUserWithOrganizationSchema(email: string): Promise<BillingPortalUser>;
    findUserWithEmail(email: string): Promise<BillingPortalUser>;
    findUserWithMobileNumber(identifier: string): Promise<BillingPortalUser>;
    findById(userId: number): Promise<BillingPortalUser>;
}
