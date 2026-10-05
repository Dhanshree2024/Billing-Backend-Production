import { IndustryTypes } from 'src/organizational-profile/public_schema_entity/industry-types.entity';
export declare class ContactSalesRequest {
    contactRequestId: number;
    plan_id: number;
    org_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: string;
    job_title: string;
    company_size_id: number;
    industry_id: number;
    budget_range_id: number;
    implementation_timeline_id: number;
    requirements: string;
    message: string;
    status: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
    industry: IndustryTypes;
}
