export declare class CreateContactSalesRequestDto {
    plan_id?: number;
    org_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: string;
    job_title?: string;
    company_size_id: number;
    industry_id?: number;
    budget_range_id?: number;
    implementation_timeline_id?: number;
    requirements?: string;
    message?: string;
    status?: string;
    is_active?: boolean;
    is_deleted?: boolean;
    company_size_value?: string;
    industry_value?: string;
    budget_range_value?: string;
    implementation_timeline_value?: string;
}
export declare class UpdateContactSalesRequestDto {
    contact_request_id: number;
    plan_id?: number;
    org_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    company_name?: string;
    job_title?: string;
    company_size_id?: number;
    industry_id?: number;
    budget_range_id?: number;
    implementation_timeline_id?: number;
    requirements?: string;
    message?: string;
    status?: string;
    is_active?: boolean;
    is_deleted?: boolean;
}
