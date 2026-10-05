export declare class CreatePlanDto {
    plan_name: string;
    description?: string;
    billing_cycle: string;
    price: number;
    subscription_type: number;
    product_id?: number;
    set_trial?: boolean;
    trial_period?: 'days' | 'months' | 'years';
    trial_period_count?: number;
}
