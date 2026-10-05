export declare class CreateOrgSubscriptionDto {
    organization_profile_id: number;
    plan_id: number;
    subscription_type_id: number;
    payment_status: 'pending' | 'completed' | 'failed';
    payment_mode?: number;
    purchase_date: Date;
}
